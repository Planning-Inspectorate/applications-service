const { getDeadlineHasInterestedPartyNumber } = require('../../../../session/deadline-session');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

const getSummaryListItemHasInterestedPartyNumber = (session) =>
	getSummaryListItem(
		'Interested party number available',
		getDeadlineHasInterestedPartyNumber(session),
		''
	);

module.exports = { getSummaryListItemHasInterestedPartyNumber };
