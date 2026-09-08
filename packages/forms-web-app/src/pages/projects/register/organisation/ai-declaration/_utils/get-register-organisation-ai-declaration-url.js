const { registerAiDeclarationRoute } = require('../../../_common/ai-declaration/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationAiDeclarationURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerAiDeclarationRoute}`;
};

module.exports = { getRegisterOrganisationAiDeclarationURL };
