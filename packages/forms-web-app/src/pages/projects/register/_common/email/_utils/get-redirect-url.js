const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentAddressURL
} = require('../../../agent/address/_utils/get-register-agent-address-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterMyselfAddressURL
} = require('../../../myself/address/_utils/get-register-myself-address-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterOrganisationAddressURL
} = require('../../../organisation/address/_utils/get-register-organisation-address-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterTypeOfPartySession
} = require('../../../registering-for/_session/type-of-party-session');
const { isRegisteringFor } = require('../../../registering-for/_utils/helpers');

const getRedirectURL = (session, caseRef, query) => {
	let nextURL = null;
	let editURL = null;

	const registeringFor = isRegisteringFor(getRegisterTypeOfPartySession(session));

	if (registeringFor.agent) {
		nextURL = getRegisterAgentAddressURL(caseRef);
		editURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfAddressURL(caseRef);
		editURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationAddressURL(caseRef);
		editURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return isQueryModeEdit(query) ? editURL : nextURL;
};

module.exports = {
	getRedirectURL
};
