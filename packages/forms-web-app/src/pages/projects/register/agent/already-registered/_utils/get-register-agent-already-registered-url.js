const { registerAlreadySubmittedRoute } = require('../../../_common/already-registered/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentAlreadyRegisteredURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAlreadySubmittedRoute}`;
};

module.exports = { getRegisterAgentAlreadyRegisteredURL };
