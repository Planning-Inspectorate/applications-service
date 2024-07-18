const { getProjectPromoterName } = require('../../../../session');
const { getExaminationApplicantValue } = require('../../_session/deadline/details/applicant');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const { getApplicantOptions } = require('../config');
const {
	routesConfig: {
		examination: {
			pages: {
				applicant,
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../../../routes/config');

const formatApplicantOptions = (i18n, session) => {
	const applicantOptions = getApplicantOptions(i18n);
	const formattedApplicantOptions = [applicantOptions[1], applicantOptions[2]];

	const selectedApplicantValue = getExaminationApplicantValue(session);

	return selectedApplicantValue
		? markActiveChecked(formattedApplicantOptions, selectedApplicantValue)
		: formattedApplicantOptions;
};

const getPageData = (i18n, session) => {
	return {
		backLinkUrl: `${hasInterestedPartyNumberRoute}`,
		id: applicant.id,
		options: formatApplicantOptions(i18n, session),
		projectName: getProjectPromoterName(session)
	};
};

module.exports = { getPageData };
