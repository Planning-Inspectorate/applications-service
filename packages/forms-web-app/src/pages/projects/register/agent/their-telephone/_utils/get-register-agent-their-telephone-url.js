const { registerAgentTheirTelephoneRoute } = require('../config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentTheirTelephoneURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentTheirTelephoneRoute}`;
};

module.exports = { getRegisterAgentTheirTelephoneURL };
