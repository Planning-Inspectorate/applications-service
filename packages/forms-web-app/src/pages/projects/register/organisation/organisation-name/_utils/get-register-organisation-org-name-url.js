const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');
const { registerOrganisationOrgNameRoute } = require('../config');

const getRegisterOrganisationOrgNameURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerOrganisationOrgNameRoute}`;
};

module.exports = { getRegisterOrganisationOrgNameURL };
