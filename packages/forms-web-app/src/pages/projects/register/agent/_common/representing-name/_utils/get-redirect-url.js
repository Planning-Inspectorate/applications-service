const { isQueryModeEdit } = require('../../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentAreThey18URL
} = require('../../../are-they-18/utils/get-register-agent-are-they-18-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../../check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentRepresentingWhoSession
} = require('../../../representing-who/_session/register-agent-representing-who-session');
const { isRepresentingWho } = require('../../../representing-who/_utils/helpers');
const {
	getRegisterAgentTheirEmailURL
} = require('../../../their-email/_utils/get-register-agent-their-email-url');

const getRedirectURL = (session, caseRef, query) => {
	let nextURL = getRegisterAgentAreThey18URL(caseRef);
	let editURL = getRegisterAgentCheckAnswersURL(caseRef);

	const representingWho = isRepresentingWho(getRegisterAgentRepresentingWhoSession(session));

	if (representingWho.organisation) nextURL = getRegisterAgentTheirEmailURL(caseRef);

	return isQueryModeEdit(query) ? editURL : nextURL;
};

module.exports = { getRedirectURL };
