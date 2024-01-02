const { registerDeclarationRoute } = require('../../../_common/declaration/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationDeclarationURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerDeclarationRoute}`;
};

module.exports = { getRegisterOrganisationDeclarationURL };
