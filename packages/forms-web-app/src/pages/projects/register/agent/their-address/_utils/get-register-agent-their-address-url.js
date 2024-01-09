const { registerAgentTheirAddressRoute } = require('../config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentTheirAddressURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAgentTheirAddressRoute}`;
};

module.exports = { getRegisterAgentTheirAddressURL };
