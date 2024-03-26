const { getRegisterAgentEmailURL } = require('../../email/_utils/get-register-agent-email-url');
const {
	getRegisterAgentOrganisationNameSession
} = require('../_session/register-agent-organisation-name-session');
const { registerAgentOrgNameInputID } = require('../config');

const getPageData = (session, caseRef) => ({
	organisationName: getRegisterAgentOrganisationNameSession(session),
	registerAgentOrgNameInputID,
	registerAgentEmailURL: getRegisterAgentEmailURL(caseRef)
});

module.exports = { getPageData };
