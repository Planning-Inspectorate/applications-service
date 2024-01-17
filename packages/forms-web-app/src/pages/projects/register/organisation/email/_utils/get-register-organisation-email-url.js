const { registerEmailRoute } = require('../../../_common/email/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationEmailURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerEmailRoute}`;
};

module.exports = { getRegisterOrganisationEmailURL };
