const { getDeadlineIsApplicant } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { isApplicant }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListIsApplicant = (session) => {
	const isApplicantText = getSelectedOptionText(
		isApplicant.options,
		getDeadlineIsApplicant(session)
	);
	if (!isApplicantText) throw new Error('Applicant text is undefined');

	return getSummaryListItemWithHtml('Applicant or not', isApplicantText);
};

module.exports = { getSummaryListIsApplicant };
