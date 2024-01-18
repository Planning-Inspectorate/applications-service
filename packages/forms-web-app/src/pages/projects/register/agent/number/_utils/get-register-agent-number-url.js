const { registerNumberRoute } = require('../../../_common/number/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentNumberURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerNumberRoute}`;
};

module.exports = { getRegisterAgentNumberURL };
