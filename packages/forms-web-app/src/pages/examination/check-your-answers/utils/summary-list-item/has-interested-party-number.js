const { getDeadlineDetailsHasInterestedPartyNumber } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const {
	getHasInterestedPartyNumberOptions
} = require('../../../has-interested-party-number/utils/get-has-interested-party-number-options');

const getSummaryListItemHasInterestedPartyNumber = (i18n, session) => {
	const hasInterestedPartyNumberOptions = getHasInterestedPartyNumberOptions(i18n);
	const hasInterestedPartyNumberText = getSelectedOptionText(
		hasInterestedPartyNumberOptions,
		getDeadlineDetailsHasInterestedPartyNumber(session)
	);
	if (!hasInterestedPartyNumberText)
		throw new Error('Has interested party number text is undefined');
	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkYourAnswers.details.summaryListHeading1'),
		hasInterestedPartyNumberText
	);
};

module.exports = { getSummaryListItemHasInterestedPartyNumber };
