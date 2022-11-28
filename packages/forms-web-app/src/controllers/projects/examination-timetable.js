const { formatDate, isNullSQLDate } = require('../../utils/date-utils');
const { isBeforeOrAfterDate } = require('../../utils/is-before-or-after-date');
const { getNow: getDate } = require('../../utils/get-now');
const { getTimetables } = require('../../services/timetable.service');
const {
	setDeadlineCaseRef,
	setDeadlineItems,
	setDeadlineId,
	setDeadlineTitle
} = require('../session/deadline');
const {
	deleteExaminationSession,
	setExaminationSession
} = require('../session/examination-session');
const {
	routesConfig: { project },
	routesConfig: {
		examination: { directory: examinationDirectory }
	},
	routesConfig: {
		examination: {
			pages: {
				haveYourSay: { route: examinationHaveYourSayRoute }
			}
		}
	}
} = require('../../routes/config');
const { marked } = require('marked');

const eventIdFieldName = 'event-id';
const eventElementId = 'examination-timetable-event-';
const eventStates = [
	{ value: 'open', text: 'Open', classes: 'govuk-tag--blue' },
	{ value: 'closed', text: 'Closed', classes: 'govuk-tag' },
	{ value: 'null', text: '', classes: '' }
];

const eventSubmitButtonActive = (timetable) => {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	return (
		timetable.typeOfEvent === 'Deadline' &&
		tomorrow < new Date(timetable.dateOfEvent) &&
		(new Date(timetable.dateTimeDeadlineStart) < getDate() ||
			isNullSQLDate(new Date(timetable.dateTimeDeadlineStart)))
	);
};

const getEvents = async (caseRef) => {
	const defaultValue = [];
	if (!caseRef || typeof caseRef !== 'string') return defaultValue;
	const response = await getTimetables(caseRef);
	const responseCode = response?.resp_code;
	const dataTimetables = response?.data?.timetables;

	if (
		!response ||
		!dataTimetables ||
		!Array.isArray(dataTimetables) ||
		!dataTimetables.length ||
		responseCode !== 200
	)
		return defaultValue;

	return dataTimetables.map((timetable) => {
		const {
			uniqueId,
			dateOfEvent: eventDate,
			title: timetableTitle,
			description,
			typeOfEvent
		} = timetable;

		const dateOfEvent = formatDate(eventDate);
		const eventTitle = timetableTitle;
		const title = `${dateOfEvent} - ${eventTitle}`;
		const submitButton = eventSubmitButtonActive(timetable);
		const getEventState = (timetable) => {
			if (new Date(timetable.dateOfEvent) < getDate()) {
				return eventStates[1]; // closed button
			}

			if (
				timetable.typeOfEvent === 'Deadline' &&
				(new Date(timetable.dateTimeDeadlineStart) < getDate() ||
					isNullSQLDate(new Date(timetable.dateTimeDeadlineStart)))
			) {
				return eventStates[0]; // open button
			}

			return eventStates[2]; // no button
		};

		const item = {
			dateOfEvent,
			description: marked.parse(description),
			eventTitle,
			id: uniqueId,
			eventIdFieldName,
			elementId: `${eventElementId + uniqueId}`,
			title,
			typeOfEvent,
			submitButton,
			eventState: getEventState(timetable)
		};

		return item;
	});
};

const getExaminationTimetable = async (req, res) => {
	const paramCaseRef = req.params?.case_ref;
	const sessionCaseRef = req.session?.caseRef;

	const projectValues = {
		caseRef: paramCaseRef ? paramCaseRef : sessionCaseRef,
		projectName: req.session?.projectName
	};

	if (paramCaseRef && !sessionCaseRef) {
		const { getAppData } = require('../../services/application.service');
		const response = await getAppData(projectValues.caseRef);
		const responseCode = response?.resp_code;
		if (response && responseCode && response.resp_code === 200) {
			const appData = response.data;
			const { CaseReference, ProjectName } = appData;
			req.session.appData = appData;
			req.session.caseRef = CaseReference;
			req.session.projectName = ProjectName;
			projectValues.projectName = ProjectName;
		}
	}

	const appData = req.session?.appData;

	const confirmedStartOfExamination = isBeforeOrAfterDate(appData?.ConfirmedStartOfExamination, [
		`The examination opens on`,
		`The examination opened on`
	]);

	const dateTimeExaminationEnds = isBeforeOrAfterDate(appData?.DateTimeExaminationEnds, [
		`The examination is expected to close on`,
		`The examination closed on`
	]);

	const { caseRef, projectName } = projectValues;

	if (!caseRef || !projectName) return res.status(404).render('error/not-found');

	const activeProjectLink = project.pages.examinationTimetable.id;
	const events = await getEvents(req.session.caseRef);
	if (events.length > 0) req.session.allEvents = events;
	const pageTitle = `Examination timetable - ${projectName} - National Infrastructure Planning`;
	const projectUrl = `${project.directory}/${caseRef}`;
	const projectEmailSignUpUrl = `${projectUrl}#project-section-email-sign-up`;
	const title = project.pages.examinationTimetable.name;

	let nextDeadline = null;
	const nextDeadlineEvent = events.find((event) => {
		return event.eventState.value === 'open' && event.typeOfEvent === 'Deadline';
	});

	if (nextDeadlineEvent) {
		nextDeadline = {};
		nextDeadline.link = `#${eventElementId}${nextDeadlineEvent.id}`;
		nextDeadline.title = `${nextDeadlineEvent.eventTitle} closes ${nextDeadlineEvent.dateOfEvent}`;
	}

	res.render(project.pages.examinationTimetable.view, {
		activeProjectLink,
		caseRef,
		confirmedStartOfExamination,
		dateTimeExaminationEnds,
		eventElementId,
		events,
		nextDeadline,
		pageTitle,
		projectEmailSignUpUrl,
		projectName,
		projectUrl,
		title
	});
};

const postExaminationTimetable = (req, res) => {
	const { session } = req;

	const allEvents = session?.allEvents;
	const caseRef = session?.caseRef;
	const id = req.body[eventIdFieldName];

	if (!caseRef || !id || !allEvents || !Array.isArray(allEvents) || !allEvents.length)
		return res.status(404).render('error/not-found');

	const deadlineItem = allEvents.find(({ id: uniqueId }) => `${uniqueId}` === `${id}`);
	if (!deadlineItem) return res.status(404).render('error/not-found');

	const deadlineItemsList = deadlineItem.description.match(/<li>(.|\n)*?<\/li>/gm);
	if (!deadlineItemsList) return res.status(500).render('error/unhandled-exception');

	const deadlineItems = deadlineItemsList.map((deadlineItem, index) => {
		return {
			value: `${index}`,
			text: deadlineItem.replace(/<\/?li>/g, '')
		};
	});

	deleteExaminationSession(session);
	setExaminationSession(session);
	setDeadlineCaseRef(session, caseRef);
	setDeadlineId(session, deadlineItem.id);
	setDeadlineItems(session, deadlineItems);
	setDeadlineTitle(session, deadlineItem.title);

	return res.redirect(`${examinationDirectory}${examinationHaveYourSayRoute}`);
};

module.exports = { getExaminationTimetable, postExaminationTimetable };
