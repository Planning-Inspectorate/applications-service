const { getDeadlineDetailsSubmittingFor } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const { getSubmittingForOptions } = require('../../../submitting-for/config');

const getSummaryListItemSubmittingFor = (session, i18n) => {
	const submittingForOptions = getSubmittingForOptions(i18n);
	const submittingForText = getSelectedOptionText(
		submittingForOptions,
		getDeadlineDetailsSubmittingFor(session)
	);
	if (!submittingForText) throw new Error('Submitting for text is undefined');

	return getSummaryListItem(
		'Making submission for',
		submittingForText,
		`${submittingFor.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmittingFor };
