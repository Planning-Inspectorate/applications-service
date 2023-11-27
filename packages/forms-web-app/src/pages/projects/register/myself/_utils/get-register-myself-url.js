const { getRegisterURL } = require('../../_utils/get-register-url');
const { registerMyselfRoute } = require('../config');

const getRegisterMyselfURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerMyselfRoute}`;
};

module.exports = { getRegisterMyselfURL };
