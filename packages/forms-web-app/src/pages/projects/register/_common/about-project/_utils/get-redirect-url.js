const {
	getRegisterAgentAiDeclarationURL
} = require('../../../agent/ai-declaration/_utils/get-register-agent-ai-declaration-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterMyselfAiDeclarationURL
} = require('../../../myself/ai-declaration/_utils/get-register-myself-ai-declaration-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterOrganisationAiDeclarationURL
} = require('../../../organisation/ai-declaration/_utils/get-register-organisation-ai-declaration-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterTypeOfPartySession
} = require('../../../registering-for/_session/type-of-party-session');
const { isRegisteringFor } = require('../../../registering-for/_utils/helpers');

const getRedirectURL = (session, caseRef, query) => {
	let nextURL = null;
	let editURL = null;

	const registeringFor = isRegisteringFor(getRegisterTypeOfPartySession(session));

	if (registeringFor.agent) {
		nextURL = getRegisterAgentAiDeclarationURL(caseRef);
		editURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfAiDeclarationURL(caseRef);
		editURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationAiDeclarationURL(caseRef);
		editURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return isQueryModeEdit(query) ? editURL : nextURL;
};

module.exports = {
	getRedirectURL
};
