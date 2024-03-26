const registerAgentOrganisationNameSessionID = 'organisation-name';

const getRegisterAgentOrganisationNameSession = (session) =>
	session.behalfRegdata.representor[registerAgentOrganisationNameSessionID];

const setRegisterAgentOrganisationNameSession = (session, value) =>
	(session.behalfRegdata.representor[registerAgentOrganisationNameSessionID] = value);

module.exports = {
	getRegisterAgentOrganisationNameSession,
	setRegisterAgentOrganisationNameSession
};
