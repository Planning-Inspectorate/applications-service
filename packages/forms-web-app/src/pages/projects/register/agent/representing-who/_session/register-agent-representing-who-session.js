const registerAgentRepresentingWhoSessionID = 'representing';

const getRegisterAgentRepresentingWhoSession = (session) =>
	session.behalfRegdata[registerAgentRepresentingWhoSessionID];

const setRegisterAgentRepresentingWhoSession = (session, value) =>
	(session.behalfRegdata[registerAgentRepresentingWhoSessionID] = value);

module.exports = { getRegisterAgentRepresentingWhoSession, setRegisterAgentRepresentingWhoSession };
