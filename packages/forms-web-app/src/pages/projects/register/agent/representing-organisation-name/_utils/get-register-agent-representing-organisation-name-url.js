const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentRepresentingOrgNameRoute } = require('../config');

const getRegisterAgentRepresentingOrgNameURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentRepresentingOrgNameRoute}`;
};

module.exports = { getRegisterAgentRepresentingOrgNameURL };
