const { registerCompleteRoute } = require('../../../_common/complete/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentCompleteURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerCompleteRoute}`;
};

module.exports = { getRegisterAgentCompleteURL };
