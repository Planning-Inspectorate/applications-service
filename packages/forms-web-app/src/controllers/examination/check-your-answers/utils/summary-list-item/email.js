const { getDeadlineDetailsEmail } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

const getSummaryListItemEmail = (session) =>
	getSummaryListItem('Email Address', getDeadlineDetailsEmail(session));

module.exports = { getSummaryListItemEmail };
