const { getRegisterURL } = require('../../_utils/get-register-url');
const { registerOrganisationRoute } = require('../config');

const getRegisterOrganisationURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerOrganisationRoute}`;
};

module.exports = { getRegisterOrganisationURL };
