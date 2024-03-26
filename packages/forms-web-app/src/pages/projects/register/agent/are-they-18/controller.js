// const { VIEW } = require('../../../../../lib/views');
const { getRedirectURL } = require('./utils/get-redirect-url');

const view = 'projects/register/agent/are-they-18/view.njk';

const getRegisterAreThey18Controller = (req, res) => {
	res.render(view, {
		over18: req.session.behalfRegdata.representee['over-18']
	});
};

const postRegisterAreThey18Controller = (req, res) => {
	const { body, params, query } = req;
	const { case_ref } = params;
	const over18 = body['over-18'];
	const { errors = {}, errorSummary = [] } = body;
	if (errors['over-18'] || Object.keys(errors).length > 0) {
		res.render(view, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representee['over-18'] = over18;

	// const redirectUrl =
	// 	req.query.mode === 'edit'
	// 		? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
	// 		: VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS;

	const redirectURL = getRedirectURL(case_ref, query);

	return res.redirect(redirectURL);
};

module.exports = {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
};
