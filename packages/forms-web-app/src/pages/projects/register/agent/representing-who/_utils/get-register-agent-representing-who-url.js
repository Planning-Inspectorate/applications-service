const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentRepresentingWhoRoute } = require('../config');

const getRegisterAgentRepresentingWhoURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentRepresentingWhoRoute}`;
};

module.exports = { getRegisterAgentRepresentingWhoURL };
