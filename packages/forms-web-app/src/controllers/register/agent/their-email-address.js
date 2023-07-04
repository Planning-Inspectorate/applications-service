const { VIEW } = require('../../../lib/views');

exports.getEmail = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.REPRESENTEE_EMAIL, {
		email: req.session.behalfRegdata.representee.email
	});
};

exports.postEmail = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.email || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.REPRESENTEE_EMAIL, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representee.email = body.email;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
