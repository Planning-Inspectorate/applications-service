const { getDeadlineDetailsHasInterestedPartyNumber } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { hasInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemHasInterestedPartyNumber = (session) => {
	const hasInterestedPartyNumberText = getSelectedOptionText(
		hasInterestedPartyNumber.options,
		getDeadlineDetailsHasInterestedPartyNumber(session)
	);
	if (!hasInterestedPartyNumberText)
		throw new Error('Has interested party number text is undefined');
	return getSummaryListItem('Interested party number available', hasInterestedPartyNumberText);
};

module.exports = { getSummaryListItemHasInterestedPartyNumber };
