const {
	getRegisterAgentCheckAnswersURL
} = require('../../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterTypeOfPartySession
} = require('../../../registering-for/_session/type-of-party-session');
const { isRegisteringFor } = require('../../../registering-for/_utils/helpers');

const getRedirectURL = (session, caseRef) => {
	let nextURL = null;

	const registeringFor = isRegisteringFor(getRegisterTypeOfPartySession(session));

	if (registeringFor.agent) {
		nextURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return nextURL;
};

module.exports = {
	getRedirectURL
};
