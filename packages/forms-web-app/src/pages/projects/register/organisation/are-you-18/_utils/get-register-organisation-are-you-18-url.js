const { registerAreYou18Route } = require('../../../_common/are-you-18/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationAreYouOver18URL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerAreYou18Route}`;
};

module.exports = { getRegisterOrganisationAreYouOver18URL };
