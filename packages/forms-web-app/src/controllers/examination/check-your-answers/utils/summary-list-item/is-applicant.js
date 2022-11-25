const { getDeadlineIsApplicant } = require('../../../../session/deadline');
const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { isApplicant }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListIsApplicant = (session) => {
	const applicantText = getSelectedOptionText(isApplicant.options, getDeadlineIsApplicant(session));
	if (!applicantText) throw new Error('Applicant text is undefined');

	return getSummaryListItemWithLink('Applicant or not', applicantText, '');
};

module.exports = { getSummaryListIsApplicant };
