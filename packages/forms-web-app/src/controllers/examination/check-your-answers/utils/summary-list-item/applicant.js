const { getDeadlineDetailsApplicant } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const {
	routesConfig: {
		examination: {
			pages: { applicant }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListApplicant = (session) => {
	const applicantText = getSelectedOptionText(
		applicant.options,
		getDeadlineDetailsApplicant(session)
	);
	if (!applicantText) throw new Error('Applicant text is undefined');

	return getSummaryListItem('Applicant or not', applicantText);
};

module.exports = { getSummaryListApplicant };
