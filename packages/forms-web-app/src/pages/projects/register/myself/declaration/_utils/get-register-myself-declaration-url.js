const { registerDeclarationRoute } = require('../../../_common/declaration/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfDeclarationURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerDeclarationRoute}`;
};

module.exports = { getRegisterMyselfDeclarationURL };
