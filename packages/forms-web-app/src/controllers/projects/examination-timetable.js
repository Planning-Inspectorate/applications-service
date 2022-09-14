const { formatDate } = require('../../utils/date-utils');
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

const getEvents = async (caseRef) => {
	const { data, resp_code } = await getTimetables(caseRef);
	const dataTimetables = data?.timetables;
	const defaultValue = [];

	if (
		!caseRef ||
		typeof caseRef !== 'string' ||
		!dataTimetables ||
		!Array.isArray(dataTimetables) ||
		!dataTimetables.length ||
		resp_code !== 200
	)
		return defaultValue;

	const timetables = data.timetables.map((timetable) => {
		const { id, uniqueId, dateOfEvent: eventDate, title: timetableTitle, description } = timetable;

		const closed = new Date() > new Date(eventDate);
		const dateOfEvent = formatDate(eventDate);
		const eventTitle = timetableTitle;
		const title = `${eventDate} - ${eventTitle}`;

		return {
			closed,
			dateOfEvent,
			description,
			eventTitle,
			id: timetable.uniqueId,
			eventIdFieldName,
			elementId: `${id + uniqueId}`,
			title
		};
	});

	return timetables;
};

const isExaminationOpened = (date, field) => {
	if (!date || typeof date !== 'string' || !field || typeof field !== 'string') return;
	const formattedDate = formatDate(date);
	const returnValues = {
		DateTimeExaminationEnds: {
			closes: `The examination is expected to close on ${formattedDate}`,
			closed: `The examination closed on ${formattedDate}`
		},
		ConfirmedStartOfExamination: {
			opens: `The examination opens on ${formattedDate}`,
			opened: `The examination opened on ${formattedDate}`
		}
	};

	const [toHappen, happened] = Object.values(returnValues[field]);

	return new Date(new Date().toUTCString()) < new Date(new Date().toUTCString(date))
		? toHappen
		: happened;
};

const getExaminationTimetable = async (req, res) => {
	const paramCaseRef = req.params?.case_ref;
	const sessionCaseRef = req.session?.caseRef;

	const projectValues = {
		caseRef: paramCaseRef ? paramCaseRef : sessionCaseRef,
		projectName: req.session?.projectName
	};

	if (paramCaseRef && !sessionCaseRef) {
		try {
			const { getAppData } = require('../../services/application.service');
			const response = await getAppData(projectValues.caseRef);
			if (response.resp_code === 200) {
				const appData = response.data;
				const { CaseReference, ProjectName } = appData;
				req.session.appData = appData;
				req.session.caseRef = CaseReference;
				req.session.projectName = ProjectName;
				projectValues.projectName = ProjectName;
			}
		} catch (err) {
			console.error('Error when running getAppData inside getExaminationTimetable. ', err?.message);
			return res.status(500).render('error/unhandled-exception');
		}
	}

	const appData = req.session?.appData;

	const confirmedStartOfExamination = isExaminationOpened(
		appData?.ConfirmedStartOfExamination,
		'ConfirmedStartOfExamination'
	);

	const dateTimeExaminationEnds = isExaminationOpened(
		appData?.DateTimeExaminationEnds,
		'DateTimeExaminationEnds'
	);

	const { caseRef, projectName } = projectValues;

	if (!caseRef || !projectName) return res.status(404).render('error/not-found');

	const activeProjectLink = project.pages.examinationTimetable.id;
	const events = await getEvents(sessionCaseRef);
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
	const caseRef = req.session?.caseRef;

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

module.exports = { getExaminationTimetable, postExaminationTimetable };
