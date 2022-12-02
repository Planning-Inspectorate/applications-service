const { getDeadlineDetailsSubmittingFor } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

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
		getDeadlineDetailsSubmittingFor(session)
	);
	if (!submittingForText) throw new Error('Submitting for text is undefined');

	return getSummaryListItem('Making submission for', submittingForText);
};

module.exports = { getSummaryListItemSubmittingFor };
