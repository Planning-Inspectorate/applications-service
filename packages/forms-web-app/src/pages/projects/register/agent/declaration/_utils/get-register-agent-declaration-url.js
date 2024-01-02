const { registerDeclarationRoute } = require('../../../_common/declaration/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentDeclarationURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerDeclarationRoute}`;
};

module.exports = { getRegisterAgentDeclarationURL };
