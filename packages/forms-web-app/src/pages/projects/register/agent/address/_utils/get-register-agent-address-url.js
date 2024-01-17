const { registerAddressRoute } = require('../../../_common/address/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentAddressURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAddressRoute}`;
};

module.exports = { getRegisterAgentAddressURL };
