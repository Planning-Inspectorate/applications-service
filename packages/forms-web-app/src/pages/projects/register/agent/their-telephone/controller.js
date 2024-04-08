const { getRedirectURL } = require('./_utils/get-redirect-url');

const view = 'projects/register/agent/their-telephone/view.njk';

const getRegisterAgentTheirTelephoneController = (req, res) => {
	return res.render(view, {
		telephone: req.session.behalfRegdata.representee.telephone
	});
};

const postRegisterAgentTheirTelephoneController = (req, res) => {
	const { body, params, query } = req;
	const { case_ref } = params;
	const { errors = {}, errorSummary = [] } = body;

	if (errors.telephone || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representee.telephone = body.telephone;

	const redirectURL = getRedirectURL(case_ref, query);

	return res.redirect(redirectURL);
};

module.exports = {
	getRegisterAgentTheirTelephoneController,
	postRegisterAgentTheirTelephoneController
};
