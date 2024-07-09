const { getDeadlineDetailsApplicant } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const { getApplicantOptions } = require('../../../applicant/config');

const getSummaryListApplicant = (session, i18n) => {
	const applicantOptions = getApplicantOptions(i18n);

	const applicantText = getSelectedOptionText(
		applicantOptions,
		getDeadlineDetailsApplicant(session)
	);
	if (!applicantText) throw new Error('Applicant text is undefined');

	return getSummaryListItem('Applicant or not', applicantText);
};

module.exports = { getSummaryListApplicant };
