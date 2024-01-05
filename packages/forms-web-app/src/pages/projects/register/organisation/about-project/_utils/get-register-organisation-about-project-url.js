const { registerAboutProjectRoute } = require('../../../_common/about-project/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationAboutProjectURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerAboutProjectRoute}`;
};

module.exports = { getRegisterOrganisationAboutProjectURL };
