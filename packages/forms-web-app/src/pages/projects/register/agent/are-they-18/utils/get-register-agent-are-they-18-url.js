const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAreThey18Route } = require('../config');

const getRegisterAgentAreThey18URL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAreThey18Route}`;
};

module.exports = { getRegisterAgentAreThey18URL };
