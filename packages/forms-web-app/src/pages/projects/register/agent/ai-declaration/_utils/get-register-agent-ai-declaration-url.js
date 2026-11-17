const { registerAiDeclarationRoute } = require('../../../_common/ai-declaration/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentAiDeclarationURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAiDeclarationRoute}`;
};

module.exports = { getRegisterAgentAiDeclarationURL };
