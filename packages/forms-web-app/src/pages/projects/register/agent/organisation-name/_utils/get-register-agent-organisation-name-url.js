const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentOrgNameRoute } = require('../config');

const getRegisterAgentOrgNameURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentOrgNameRoute}`;
};

module.exports = { getRegisterAgentOrgNameURL };
