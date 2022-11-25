const { getDeadlineEmail } = require('../../../../session/deadline');
const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');

const getSummaryListItemEmail = (session) =>
	getSummaryListItemWithLink('Email Address', getDeadlineEmail(session), '');

module.exports = { getSummaryListItemEmail };
