const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const { registerAgentRepresentingHouseholdRoute } = require('../config');

const getRegisterAgentRepresentingHouseholdURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentRepresentingHouseholdRoute}`;
};

module.exports = { getRegisterAgentRepresentingHouseholdURL };
