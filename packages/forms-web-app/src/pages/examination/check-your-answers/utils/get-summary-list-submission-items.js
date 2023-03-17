const { getSummaryListItemSubmissionItems } = require('./summary-list-item');

const getSummaryListSubmissionItems = (session) => [getSummaryListItemSubmissionItems(session)];

module.exports = { getSummaryListSubmissionItems };
