const { registerEmailRoute } = require('../../../_common/email/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentEmailURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerEmailRoute}`;
};

module.exports = { getRegisterAgentEmailURL };
