const { getDeadlineEmail } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');

const getSummaryListItemEmail = (session) =>
	getSummaryListItemWithHtml('Email Address', getDeadlineEmail(session));

module.exports = { getSummaryListItemEmail };
