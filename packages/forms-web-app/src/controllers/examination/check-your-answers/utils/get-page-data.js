const { getDeadlineTitle } = require('../../../session/deadline');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { addAnotherDeadlineItem, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session) => {
	return {
		backLinkUrl: `${directory}${addAnotherDeadlineItem.route}`,
		deadlineTitle: getDeadlineTitle(session),
		pageTitle: checkYourAnswers.name,
		summaryListDetailsTitle: 'Your details',
		summaryListSubmissionItemsTitle: 'Your submissions',
		title: checkYourAnswers.name
	};
};

module.exports = { getPageData };
