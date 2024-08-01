const { getSummaryListDetails } = require('./get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');
const {
	getDeadlineTitleByLocale
} = require('../../_utils/get-content/get-deadline-title-by-locale');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem, processSubmission }
		}
	}
} = require('../../../../routes/config');

const getPageData = (i18n, session) => ({
	backLinkUrl: `${addAnotherDeadlineItem.route}`,
	deadlineTitle: getDeadlineTitleByLocale(i18n, session),
	nextPageUrl: `${processSubmission.route}`,
	summaryListDetails: getSummaryListDetails(i18n, session),
	summaryListSubmissionItems: getSummaryListSubmissionItems(i18n, session)
});

module.exports = { getPageData };
