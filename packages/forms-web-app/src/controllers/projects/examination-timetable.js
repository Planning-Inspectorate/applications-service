const { formatDate } = require('../../utils/date-utils');
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

const data = {
	timetable: [
		{
			id: 1,
			uniqueId: 'WS010006-34601',
			caseReference: 'EN010009',
			title: 'Deadline 2',
			description: 'Pre examination for the application by the end of the period of six months',
			dateOfEvent: '2020-08-19 11:21:42',
			timetableType: 'Exams',
			typeOfEvent: 'Deadline',
			location: null,
			dateCreated: '2020-02-16 11:21:42',
			dateLastModified: '2020-04-16 15:44:52',
			dateTimeDeadlineStart: '2020-05-16 15:44:52',
			sourceSystem: 'Horizon'
		},
		{
			id: 2,
			uniqueId: 'WS010006-34602',
			caseReference: 'EN010009',
			title: 'Deadline 1A',
			description:
				'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
			dateOfEvent: '2023-01-11 11:21:42',
			timetableType: 'Exams',
			typeOfEvent: 'Deadline',
			location: null,
			dateCreated: '2020-02-16 11:21:42',
			dateLastModified: '2020-04-16 15:44:52',
			dateTimeDeadlineStart: '2020-05-16 15:44:52',
			sourceSystem: 'Horizon'
		}
	],
	totalItems: 2,
	itemsPerPage: 100,
	totalPages: 1,
	currentPage: 1
};

const getEvents = () => {
	const defaultValue = [];

	if (!data?.timetable || !Array.isArray(data.timetable) || !data.timetable.length)
		return defaultValue;

	const timetables = data.timetable.map((timetable) => {
		const closed = new Date() > new Date(timetable.dateOfEvent);
		const dateOfEvent = formatDate(timetable.dateOfEvent);
		const eventTitle = timetable.title;
		const title = `${dateOfEvent} - ${eventTitle}`;

		return {
			closed,
			dateOfEvent,
			description: timetable.description,
			eventTitle,
			id: timetable.uniqueId,
			eventIdFieldName,
			elementId: `${eventElementId}${timetable.uniqueId}`,
			title
		};
	});

	return timetables;
};

exports.getExaminationTimetable = async (req, res) => {
	const { caseRef, projectName } = req.session;

	if (!caseRef || !projectName) return res.status(404).render('error/not-found');

	const activeProjectLink = project.pages.examinationTimetable.id;
	const events = getEvents();
	const pageTitle = `Examination timetable - ${projectName} - National Infrastructure Planning`;
	const projectUrl = `${project.directory}/${req.session.caseRef}`;
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
		eventElementId,
		events,
		nextDeadline,
		projectName,
		pageTitle,
		projectUrl,
		projectEmailSignUpUrl,
		title
	});
};

exports.postExaminationTimetable = (req, res) => {
	const { caseRef } = req.session;

	if (!caseRef) return res.status(404).render('error/not-found');

	if (req.session[examinationSession.name]) delete req.session[examinationSession.name];

	req.session[examinationSession.name] = {};

	const reqExaminationSession = req.session[examinationSession.name];

	const id = req.body[eventIdFieldName];

	if (!id) return res.status(404).render('error/not-found');

	const setEvent = data.timetable.find((event) => `${event.uniqueId}` === `${id}`);

	if (!setEvent) return res.status(404).render('error/not-found');

	reqExaminationSession[examinationSession.property.caseRef] = caseRef;
	reqExaminationSession[examinationSession.property.description] = setEvent.description;
	reqExaminationSession[examinationSession.property.id] = setEvent.id;
	reqExaminationSession[examinationSession.property.title] = setEvent.title;

	res.redirect(`${examinationDirectory}${examinationHaveYourSayRoute}`);
};
