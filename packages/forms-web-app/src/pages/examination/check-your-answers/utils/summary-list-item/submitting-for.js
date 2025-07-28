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

const getSummaryListItemSubmittingFor = (i18n, session) => {
	const submittingForOptions = getSubmittingForOptions(i18n);
	const submittingForText = getSelectedOptionText(
		submittingForOptions,
		getDeadlineDetailsSubmittingFor(session)
	);
	if (!submittingForText) throw new Error('Submitting for text is undefined');

	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkYourAnswers.details.summaryListHeading3'),
		submittingForText,
		`${submittingFor.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmittingFor };
