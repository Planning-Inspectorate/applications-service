const { formatDate, isNullSQLDate } = require('../../utils/date-utils');
const {
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds
} = require('../../utils/is-before-or-after-date');
const { getTimetables } = require('../../services/timetable.service');
const { setProjectPromoterName } = require('./session');
const config = require('../../config');
const {
	routesConfig: {
		project,
		examination: {
			directory: examinationDirectory,
			pages: {
				haveYourSay: { route: examinationHaveYourSayRoute }
			}
		}
	}
} = require('../../routes/config');
const { marked } = require('marked');

const getDate = () => new Date();

const examinationSession = config.sessionStorage.examination;
const eventIdFieldName = 'event-id';
const eventElementId = 'examination-timetable-event-';
const eventStates = [
	{ value: 'open', text: 'Open', classes: 'govuk-tag--blue' },
	{ value: 'closed', text: 'Closed', classes: 'govuk-tag' },
	{ value: 'null', text: '', classes: '' }
];

const setTimeToEndOfDay = (date) => new Date(date).setHours(24, 0, 0, 0);

const eventSubmitButtonActive = (timetable) => {
	const currentDate = new Date();

	return (
		timetable.typeOfEvent === 'Deadline' &&
		currentDate < setTimeToEndOfDay(timetable.dateOfEvent) &&
		(new Date(timetable.dateTimeDeadlineStart) < currentDate ||
			isNullSQLDate(new Date(timetable.dateTimeDeadlineStart)))
	);
};

const displayEvents = (dateOfNonAcceptance) =>
	dateOfNonAcceptance && getDate() >= new Date(dateOfNonAcceptance);

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
			if (setTimeToEndOfDay(timetable.dateOfEvent) < getDate()) {
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
	const { case_ref: paramCaseRef } = req.params;
	const projectValues = {
		caseRef: paramCaseRef,
		projectName: req.session?.projectName
	};

	const { getAppData } = require('../../services/application.service');
	const response = await getAppData(projectValues.caseRef);
	const responseCode = response?.resp_code;
	if (responseCode && response.resp_code !== 200) return res.status(404).render('error/not-found');

	if (response && responseCode && response.resp_code === 200) {
		const appData = response.data;
		const { CaseReference, ProjectName, PromoterName } = appData;
		req.session.appData = appData;
		req.session.caseRef = CaseReference;
		req.session.projectName = ProjectName;
		setProjectPromoterName(req.session, PromoterName);
		projectValues.projectName = ProjectName;
	}

	const appData = req.session?.appData;

	const confirmedStartOfExamination = getConfirmedStartOfExamination(
		appData?.ConfirmedStartOfExamination
	);

	const dateTimeExaminationEnds = getDateTimeExaminationEnds(
		appData?.DateTimeExaminationEnds,
		appData?.Stage4ExtensiontoExamCloseDate,
		appData?.ConfirmedStartOfExamination
	);

	const { caseRef, projectName } = projectValues;

	if (!caseRef || !projectName) return res.status(404).render('error/not-found');

	const events = displayEvents(appData.dateOfNonAcceptance) ? await getEvents(paramCaseRef) : [];
	if (events.length > 0) req.session.allEvents = events;
	const activeProjectLink = project.pages.examinationTimetable.id;
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
	const allEvents = req.session?.allEvents;
	const caseRef = req.session?.caseRef;
	const id = req.body[eventIdFieldName];

	if (!caseRef || !id || !allEvents || !Array.isArray(allEvents) || !allEvents.length)
		return res.status(404).render('error/not-found');

	if (req.session[examinationSession.name]) delete req.session[examinationSession.name];

	req.session[examinationSession.name] = {};

	const reqExaminationSession = req.session[examinationSession.name];

	const setEvent = allEvents.find(({ id: uniqueId }) => `${uniqueId}` === `${id}`);

	if (!setEvent) return res.status(404).render('error/not-found');

	const deadlineItemsList = setEvent.description.match(/<li>(.|\n)*?<\/li>/gm);

	if (!deadlineItemsList) return res.status(500).render('error/unhandled-exception');

	const deadlineItems = deadlineItemsList.map((deadlineItem, index) => {
		return {
			value: `${index}`,
			text: deadlineItem.replace(/<\/?li>/g, '')
		};
	});

	reqExaminationSession[examinationSession.property.caseRef] = caseRef;
	reqExaminationSession[examinationSession.property.deadlineItems] = deadlineItems;
	reqExaminationSession[examinationSession.property.id] = setEvent.id;
	reqExaminationSession[examinationSession.property.title] = setEvent.title;

	res.redirect(`${examinationDirectory}${examinationHaveYourSayRoute}`);
};

module.exports = { getExaminationTimetable, postExaminationTimetable };
