const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentRepresentingFamilyNameRoute } = require('../config');

const getRegisterAgentRepresentingFamilyNameURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentRepresentingFamilyNameRoute}`;
};

module.exports = { getRegisterAgentRepresentingFamilyNameURL };
