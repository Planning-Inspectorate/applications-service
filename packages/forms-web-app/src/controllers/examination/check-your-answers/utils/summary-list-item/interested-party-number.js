const {
	getDeadlineInterestedPartyNumber
} = require('../../../../session/deadline-session/deadline-interested-party-number');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItem('Interested party number', getDeadlineInterestedPartyNumber(session), '');

module.exports = { getSummaryListItemInterestedPartyNumber };
