const { getDeadlineInterestedPartyNumber } = require('../../../../session/deadline');
const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');

const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItemWithLink(
		'Interested party number',
		getDeadlineInterestedPartyNumber(session),
		''
	);

module.exports = { getSummaryListItemInterestedPartyNumber };
