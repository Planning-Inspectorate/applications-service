const {
	routesConfig: {
		examination: {
			pages: {
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		},
		project
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { setProjectPromoterName } = require('../../../session');
const { getAppData } = require('../../../services/application.service');
const { getEvents } = require('../../projects/examination-timetable/utils/events/get-events');

const view = 'examination/have-your-say/view.njk';

async function getSessionStuff(session, case_ref) {
	const applicationData = await getAppData(case_ref);
	const appData = applicationData.data;
	session.caseRef = case_ref;
	session.projectName = appData.ProjectName;
	setProjectPromoterName(session, appData.PromoterName);
	const events = await getEvents(appData);
	const setEvent = events.upcoming.events.find(
		({ id: uniqueId }) => `${uniqueId}` === `${session.examination.examinationTimetableId}`
	);

	const deadlineItemsList = setEvent.description.match(/<li>(.|\n)*?<\/li>/gm);
	const deadlineItems = deadlineItemsList.map((deadlineItem, index) => ({
		value: `${index}`,
		text: deadlineItem.replace(/<\/?li>/g, '')
	}));

	session.examination = {
		...session.examination,
		caseRef: case_ref,
		deadlineItems: deadlineItems,
		id: setEvent.id,
		title: setEvent.title
	};
}

const getHaveYourSay = async (req, res) => {
	try {
		const { params, session } = req;
		const { case_ref } = params;
		await getSessionStuff(session, case_ref);

		const backLinkUrl = `${project.directory}/${case_ref}${project.pages.examinationTimetable.route}`;
		const pageTitle = 'Have your say during the Examination of the application fella';
		const startNowUrl = `${project.directory}/${case_ref}/${hasInterestedPartyNumberRoute}`;
		const title = 'Have your say during the Examination of the application';

		return res.render(view, {
			backLinkUrl,
			pageTitle,
			startNowUrl,
			title
		});
	} catch (e) {
		logger.error(e);
		return res.status(404).render('error/not-found');
	}
};

module.exports = {
	getHaveYourSay
};
