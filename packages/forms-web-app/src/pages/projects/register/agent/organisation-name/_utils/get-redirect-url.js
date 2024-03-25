const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');
const { getRegisterAgentEmailURL } = require('../../email/_utils/get-register-agent-email-url');

const getRedirectURL = (caseRef, query) => {
	let redirectURL = getRegisterAgentEmailURL(caseRef);

	if (isQueryModeEdit(query)) redirectURL = getRegisterAgentCheckAnswersURL(caseRef);

	return redirectURL;
};

module.exports = { getRedirectURL };
