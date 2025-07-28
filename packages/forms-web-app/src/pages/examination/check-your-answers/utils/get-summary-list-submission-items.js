const { getSummaryListItemSubmissionItems } = require('./summary-list-item');

const getSummaryListSubmissionItems = (i18n, session) => [
	getSummaryListItemSubmissionItems(i18n, session)
];

module.exports = { getSummaryListSubmissionItems };
