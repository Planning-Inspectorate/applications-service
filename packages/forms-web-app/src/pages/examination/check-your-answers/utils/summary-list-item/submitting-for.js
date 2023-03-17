const { getDeadlineDetailsSubmittingFor } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');

const getSummaryListItemSubmittingFor = (session) => {
	const submittingForText = getSelectedOptionText(
		submittingFor.options,
		getDeadlineDetailsSubmittingFor(session)
	);
	if (!submittingForText) throw new Error('Submitting for text is undefined');

	return getSummaryListItem(
		'Making submission for',
		submittingForText,
		`${directory}${submittingFor.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmittingFor };
