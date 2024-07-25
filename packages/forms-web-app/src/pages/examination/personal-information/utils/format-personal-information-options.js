const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const { getPersonalInformationOptions } = require('../config');

const formatPersonalInformationOptions = (i18n, session) => {
	const personalInformationOptions = getPersonalInformationOptions(i18n);
	const { personalInformation } = getActiveSubmissionItem(session);

	const formattedPersonalInformationOptions = [
		personalInformationOptions[1],
		personalInformationOptions[2]
	];

	return personalInformation
		? markActiveChecked(formattedPersonalInformationOptions, personalInformation)
		: formattedPersonalInformationOptions;
};

module.exports = { formatPersonalInformationOptions };
