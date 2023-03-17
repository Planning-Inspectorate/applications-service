const { getDeadlineDetailsHasInterestedPartyNumber } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
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
