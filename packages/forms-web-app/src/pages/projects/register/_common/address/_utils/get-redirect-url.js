const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentNumberURL
} = require('../../../agent/number/_utils/get-register-agent-number-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterMyselfNumberURL
} = require('../../../myself/number/_utils/get-register-myself-number-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterOrganisationNumberURL
} = require('../../../organisation/number/_utils/get-register-organisation-number-url');
const {
	getRegisterTypeOfPartySession
} = require('../../../registering-for/_session/type-of-party-session');
const { isRegisteringFor } = require('../../../registering-for/_utils/helpers');

const getRedirectURL = (session, caseRef, query) => {
	let nextURL = null;
	let editURL = null;

	const registeringFor = isRegisteringFor(getRegisterTypeOfPartySession(session));

	if (registeringFor.agent) {
		nextURL = getRegisterAgentNumberURL(caseRef);
		editURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfNumberURL(caseRef);
		editURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationNumberURL(caseRef);
		editURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return isQueryModeEdit(query) ? editURL : nextURL;
};

module.exports = {
	getRedirectURL
};
