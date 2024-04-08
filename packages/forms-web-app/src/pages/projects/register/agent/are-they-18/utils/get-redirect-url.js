const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentTheirEmailURL
} = require('../../their-email/_utils/get-register-agent-their-email-url');

const getRedirectURL = (caseRef, query) =>
	isQueryModeEdit(query)
		? getRegisterAgentCheckAnswersURL(caseRef)
		: getRegisterAgentTheirEmailURL(caseRef);

module.exports = { getRedirectURL };
