const { registerCheckAnswersRoute } = require('../../../_common/check-answers/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentCheckAnswersURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerCheckAnswersRoute}`;
};

module.exports = { getRegisterAgentCheckAnswersURL };
