const { registerAiDeclarationRoute } = require('../../../_common/ai-declaration/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfAiDeclarationURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerAiDeclarationRoute}`;
};

module.exports = { getRegisterMyselfAiDeclarationURL };
