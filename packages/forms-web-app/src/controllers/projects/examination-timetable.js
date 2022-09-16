const { formatDate } = require('../../utils/date-utils');
const { isBeforeOrAfterDate } = require('../../utils/is-before-or-after-date');
const { getNow: getDate } = require('../../utils/get-now');
const { getTimetables } = require('../../services/timetable.service');
const config = require('../../config');
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

const examinationSession = config.sessionStorage.examination;
const eventIdFieldName = 'event-id';
const eventElementId = 'examination-timetable-event-';

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

	const timetables = [];

	response.data.timetables.forEach((timetable) => {
		const {
			id,
			uniqueId,
			dateOfEvent: eventDate,
			title: timetableTitle,
			description,
			typeOfEvent
		} = timetable;

		const isDeadlineAndNotFromPast = new Date(eventDate) >= getDate() && typeOfEvent === 'Deadline';

		const closed = getDate() > new Date(eventDate);
		const dateOfEvent = formatDate(eventDate);
		const eventTitle = timetableTitle;
		const title = `${dateOfEvent} - ${eventTitle}`;

		const item = {
			closed,
			dateOfEvent,
			description,
			eventTitle,
			id: uniqueId,
			eventIdFieldName,
			elementId: `${id + uniqueId}`,
			title
		};

		isDeadlineAndNotFromPast ? timetables.unshift(item) : timetables.push(item);
	});

	return timetables;
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
		return !event.closed;
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

	reqExaminationSession[examinationSession.property.caseRef] = caseRef;
	reqExaminationSession[examinationSession.property.description] = setEvent.description;
	reqExaminationSession[examinationSession.property.id] = setEvent.id;
	reqExaminationSession[examinationSession.property.title] = setEvent.title;

	res.redirect(`${examinationDirectory}${examinationHaveYourSayRoute}`);
};

module.exports = { getExaminationTimetable, postExaminationTimetable };
