const { getDeadlineHasInterestedPartyNumber } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');
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
		getDeadlineHasInterestedPartyNumber(session)
	);
	if (!hasInterestedPartyNumberText)
		throw new Error('Has interested party number text is undefined');
	return getSummaryListItemWithHtml(
		'Interested party number available',
		hasInterestedPartyNumberText
	);
};

module.exports = { getSummaryListItemHasInterestedPartyNumber };
