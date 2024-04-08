const { isRegisteringFor } = require('../../../registering-for/_utils/helpers');
const {
	getRegisterTypeOfPartySession
} = require('../../../registering-for/_session/type-of-party-session');
const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterAgentRepresentingWhoURL
} = require('../../../agent/representing-who/_utils/get-register-agent-representing-who-url');
const {
	getRegisterMyselfAboutProjectURL
} = require('../../../myself/about-project/_utils/get-register-myself-about-project-url');
const {
	getRegisterOrganisationAboutProjectURL
} = require('../../../organisation/about-project/_utils/get-register-organisation-about-project-url');

const getRedirectURL = (session, caseRef, query) => {
	let nextURL = null;
	let editURL = null;

	const registeringFor = isRegisteringFor(getRegisterTypeOfPartySession(session));

	if (registeringFor.agent) {
		nextURL = getRegisterAgentRepresentingWhoURL(caseRef);
		editURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfAboutProjectURL(caseRef);
		editURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationAboutProjectURL(caseRef);
		editURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return isQueryModeEdit(query) ? editURL : nextURL;
};

module.exports = {
	getRedirectURL
};
