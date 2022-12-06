const { getDeadlineTitle } = require('../../session/deadline');
const { getSummaryListDetails } = require('./get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { addAnotherDeadlineItem, checkYourAnswers, processSubmission }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session) => {
	return {
		backLinkUrl: `${directory}${addAnotherDeadlineItem.route}`,
		deadlineTitle: getDeadlineTitle(session),
		nextPageUrl: `${directory}${processSubmission.route}`,
		pageTitle: checkYourAnswers.name,
		summaryListDetails: getSummaryListDetails(session),
		summaryListDetailsTitle: 'Your details',
		summaryListSubmissionItems: getSummaryListSubmissionItems(session),
		summaryListSubmissionItemsTitle: 'Your submissions',
		title: checkYourAnswers.name
	};
};

module.exports = { getPageData };
