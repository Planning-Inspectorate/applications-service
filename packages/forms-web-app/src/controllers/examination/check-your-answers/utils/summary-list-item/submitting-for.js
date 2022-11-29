const { getDeadlineSubmittingFor } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');
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

	return getSummaryListItemWithHtml('Making submission for', submittingForText);
};

module.exports = { getSummaryListItemSubmittingFor };
