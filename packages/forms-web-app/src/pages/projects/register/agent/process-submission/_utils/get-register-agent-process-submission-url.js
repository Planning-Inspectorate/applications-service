const { registerProcessSubmissionRoute } = require('../../../_common/process-submission/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');
const getRegisterAgentProcessSubmissionURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);
	return `${registerAgentURL}/${registerProcessSubmissionRoute}`;
};
module.exports = { getRegisterAgentProcessSubmissionURL };
