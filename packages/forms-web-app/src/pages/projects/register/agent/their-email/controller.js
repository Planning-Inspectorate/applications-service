// const { VIEW } = require('../../../../../lib/views');
const { getRedirectURL } = require('./_utils/get-redirect-url');

const view = 'projects/register/agent/their-email/view.njk';

const getRegisterAgentTheirEmailController = (req, res) => {
	return res.render(view, {
		email: req.session.behalfRegdata.representee.email
	});
};

const postRegisterAgentTheirEmailController = (req, res) => {
	const { body, params, query } = req;
	const { case_ref } = params;
	const { errors = {}, errorSummary = [] } = body;

	if (errors.email || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representee.email = body.email;

	// const redirectUrl =
	// 	req.query.mode === 'edit'
	// 		? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
	// 		: VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE;

	const redirectURL = getRedirectURL(case_ref, query);

	return res.redirect(redirectURL);
};

module.exports = {
	getRegisterAgentTheirEmailController,
	postRegisterAgentTheirEmailController
};
