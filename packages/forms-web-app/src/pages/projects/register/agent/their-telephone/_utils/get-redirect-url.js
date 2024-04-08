const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentAboutProjectURL
} = require('../../about-project/_utils/get-register-agent-about-project-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');

const getRedirectURL = (caseRef, query) =>
	isQueryModeEdit(query)
		? getRegisterAgentCheckAnswersURL(caseRef)
		: getRegisterAgentAboutProjectURL(caseRef);

module.exports = { getRedirectURL };
