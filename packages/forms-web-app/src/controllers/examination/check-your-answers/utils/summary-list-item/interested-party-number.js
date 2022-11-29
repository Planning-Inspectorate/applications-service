const { getDeadlineInterestedPartyNumber } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');

const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItemWithHtml('Interested party number', getDeadlineInterestedPartyNumber(session));

module.exports = { getSummaryListItemInterestedPartyNumber };
