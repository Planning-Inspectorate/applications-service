const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentTheirTelephoneURL
} = require('../../their-telephone/_utils/get-register-agent-their-telephone-url');

const getRedirectURL = (caseRef, query) =>
	isQueryModeEdit(query)
		? getRegisterAgentCheckAnswersURL(caseRef)
		: getRegisterAgentTheirTelephoneURL(caseRef);

module.exports = { getRedirectURL };
