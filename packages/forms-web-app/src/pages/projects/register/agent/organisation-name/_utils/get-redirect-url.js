const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');
const { getRegisterAgentEmailURL } = require('../../email/_utils/get-register-agent-email-url');

const getRedirectURL = (caseRef, query) =>
	isQueryModeEdit(query)
		? getRegisterAgentCheckAnswersURL(caseRef)
		: getRegisterAgentEmailURL(caseRef);

module.exports = { getRedirectURL };
