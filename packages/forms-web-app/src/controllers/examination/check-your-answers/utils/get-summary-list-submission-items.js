const { getSummaryListItemSubmissionItems } = require('./summary-list-item');

const getSummaryListSubmissionItems = (session) => ({
	summaryListSubmissionItems: [getSummaryListItemSubmissionItems(session)]
});

module.exports = { getSummaryListSubmissionItems };
