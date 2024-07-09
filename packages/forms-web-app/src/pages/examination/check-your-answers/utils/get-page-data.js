const { getDeadlineTitle } = require('../../_session/deadline');
const { getSummaryListDetails } = require('./get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem, checkYourAnswers, processSubmission }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session, i18n) => {
	return {
		backLinkUrl: `${addAnotherDeadlineItem.route}`,
		deadlineTitle: getDeadlineTitle(session),
		nextPageUrl: `${processSubmission.route}`,
		pageTitle: checkYourAnswers.name,
		summaryListDetails: getSummaryListDetails(session, i18n),
		summaryListDetailsTitle: 'Your details',
		summaryListSubmissionItems: getSummaryListSubmissionItems(session),
		summaryListSubmissionItemsTitle: 'Your submissions',
		title: checkYourAnswers.name
	};
};

module.exports = { getPageData };
