const {
	setRegisteringForAgentSession,
	setRegisteringForMyselfSession,
	setRegisteringForOrganisationSession
} = require('../_session/registering-for-session');
const { setRegisterTypeOfPartySession } = require('../_session/type-of-party-session');
const { isRegisteringFor } = require('./helpers');

const setRegisteringForSession = (session, selectedOption) => {
	const registeringFor = isRegisteringFor(selectedOption);

	setRegisterTypeOfPartySession(session, selectedOption);

	if (registeringFor.agent) setRegisteringForAgentSession(session);
	else if (registeringFor.myself) setRegisteringForMyselfSession(session);
	else if (registeringFor.organisation) setRegisteringForOrganisationSession(session);
};

module.exports = { setRegisteringForSession };
