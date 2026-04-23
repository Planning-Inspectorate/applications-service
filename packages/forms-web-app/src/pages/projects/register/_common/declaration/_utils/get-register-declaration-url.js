const { registerDeclarationRoute } = require('../config');
const { getRegisterURL } = require('../../../_utils/get-register-url');

const getRegisterDeclarationURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerDeclarationRoute}`;
};

module.exports = { getRegisterDeclarationURL };
