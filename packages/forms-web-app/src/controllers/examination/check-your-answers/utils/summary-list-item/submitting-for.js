const { getDeadlineSubmittingFor } = require('../../../../session/deadline');
const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemSubmittingFor = (session) => {
	const submittingForText = getSelectedOptionText(
		submittingFor.options,
		getDeadlineSubmittingFor(session)
	);
	if (!submittingForText) throw new Error('Submitting for text is undefined');

	return getSummaryListItemWithLink('Making submission for', submittingForText, '');
};

module.exports = { getSummaryListItemSubmittingFor };
