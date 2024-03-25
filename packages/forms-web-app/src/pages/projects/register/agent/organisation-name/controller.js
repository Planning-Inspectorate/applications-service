// const { VIEW } = require('../../../../../lib/views');
const {
	setRegisterAgentOrganisationNameSession
} = require('./_session/register-agent-organisation-name-session');
const { getPageData } = require('./_utils/get-page-data');
const { getRedirectURL } = require('./_utils/get-redirect-url');
const { registerAgentOrgNameInputID } = require('./config');

const view = 'projects/register/agent/organisation-name/view.njk';

const getRegisterAgentOrgNameController = (req, res) => {
	const { params, session } = req;
	const { case_ref } = params;

	return res.render(view, getPageData(session, case_ref));
};

const postRegisterAgentOrgNameController = (req, res) => {
	const { body, params, query, session } = req;
	const { case_ref } = params;
	const { errors = {}, errorSummary = [] } = body;

	const enteredOrganisationName = body[registerAgentOrgNameInputID];

	if (Object.keys(errors).length > 0) {
		return res.render(view, {
			...getPageData(session, case_ref),
			organisationName: enteredOrganisationName,
			errors,
			errorSummary
		});
	}

	setRegisterAgentOrganisationNameSession(session, enteredOrganisationName);

	const redirectURL = getRedirectURL(case_ref, query);

	return res.redirect(redirectURL);
};

module.exports = {
	getRegisterAgentOrgNameController,
	postRegisterAgentOrgNameController
};
