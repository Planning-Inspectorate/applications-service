const registrationData = require('./registration-data.json');

const registeringForAgentSessionID = 'behalfRegdata';
const registeringForMyselfSessionID = 'mySelfRegdata';
const registeringForOrganisationSessionID = 'orgRegdata';

const getRegisteringForAgentSession = (session) => session[registeringForAgentSessionID];

const setRegisteringForAgentSession = (session) =>
	(session[registeringForAgentSessionID] = registrationData.behalf);

const getRegisteringForMyselfSession = (session) => session[registeringForMyselfSessionID];

const setRegisteringForMyselfSession = (session) =>
	(session[registeringForMyselfSessionID] = registrationData.myself);

const getRegisteringForOrganisationSession = (session) =>
	session[registeringForOrganisationSessionID];

const setRegisteringForOrganisationSession = (session) =>
	(session[registeringForOrganisationSessionID] = registrationData.org);

module.exports = {
	getRegisteringForAgentSession,
	setRegisteringForAgentSession,
	getRegisteringForMyselfSession,
	setRegisteringForMyselfSession,
	getRegisteringForOrganisationSession,
	setRegisteringForOrganisationSession
};
