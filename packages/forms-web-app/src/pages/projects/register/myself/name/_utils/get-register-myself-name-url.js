const { registerNameRoute } = require('../../../_common/name/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfNameURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerNameRoute}`;
};

module.exports = { getRegisterMyselfNameURL };
