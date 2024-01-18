const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentRepresentingPersonNameRoute } = require('../config');

const getRegisterAgentRepresentingPersonNameURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentRepresentingPersonNameRoute}`;
};

module.exports = { getRegisterAgentRepresentingPersonNameURL };
