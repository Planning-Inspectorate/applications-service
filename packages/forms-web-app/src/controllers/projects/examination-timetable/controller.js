const logger = require('../../../lib/logger');
const { getAppData } = require('../../../services/application.service');
const { getPageData } = require('./utils/get-page-data');
const { setProjectPromoterName } = require('./../session');
const config = require('../../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				haveYourSay: { route: examinationHaveYourSayRoute }
			}
		},
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../routes/config');

const examinationSession = config.sessionStorage.examination;

const getExaminationTimetable = async (req, res) => {
	try {
		const { params, session } = req;
		const { case_ref } = params;
		const response = await getAppData(case_ref);

		const appData = response.data;
		session.appData = appData;
		session.caseRef = appData.CaseReference;
		session.projectName = appData.ProjectName;
		setProjectPromoterName(session, appData.PromoterName);

		const pageData = await getPageData(appData);

		session.allEvents = pageData.events.upcoming.events;

		res.render(examinationTimetable.view, pageData);
	} catch (error) {
		logger.error(error);
		res.status(500);
		return res.render('error/unhandled-exception');
	}
};

const postExaminationTimetable = (req, res) => {
	const allEvents = req.session?.allEvents;
	const caseRef = req.session?.caseRef;
	const id = req.body[examinationTimetable.id];

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
