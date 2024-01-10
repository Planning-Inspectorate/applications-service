const { registerAgentTheirEmailRoute } = require('../config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentTheirEmailURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentTheirEmailRoute}`;
};

module.exports = { getRegisterAgentTheirEmailURL };
