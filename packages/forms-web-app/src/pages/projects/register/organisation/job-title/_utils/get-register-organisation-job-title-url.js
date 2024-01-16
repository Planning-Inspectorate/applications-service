const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');
const { registerOrganisationJobTitleRoute } = require('../config');

const getRegisterOrganisationJobTitleURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerOrganisationJobTitleRoute}`;
};

module.exports = { getRegisterOrganisationJobTitleURL };
