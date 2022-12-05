const { getDeadlineDetailsInterestedPartyNumber } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItem('Interested party number', getDeadlineDetailsInterestedPartyNumber(session));

module.exports = { getSummaryListItemInterestedPartyNumber };
