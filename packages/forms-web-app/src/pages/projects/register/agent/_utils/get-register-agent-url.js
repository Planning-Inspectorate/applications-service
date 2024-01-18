const { getRegisterURL } = require('../../_utils/get-register-url');
const { registerAgentRoute } = require('../config');

const getRegisterAgentURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerAgentRoute}`;
};

module.exports = { getRegisterAgentURL };
