const { getRegisterURL } = require('../../_utils/get-register-url');
const { registeringForRoute } = require('../config');

const getRegisteringForURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registeringForRoute}`;
};

module.exports = { getRegisteringForURL };
