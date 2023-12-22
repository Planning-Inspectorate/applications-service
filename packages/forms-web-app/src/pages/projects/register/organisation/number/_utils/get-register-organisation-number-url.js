const { registerNumberRoute } = require('../../../_common/number/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationNumberURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerNumberRoute}`;
};

module.exports = { getRegisterOrganisationNumberURL };
