const { registerNameRoute } = require('../../../_common/name/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentNameURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerNameRoute}`;
};

module.exports = { getRegisterAgentNameURL };
