const { VIEW } = require('../../../lib/views');

exports.getTelephone = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE, {
		telephone: req.session.behalfRegdata.representee.telephone
	});
};

exports.postTelephone = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.telephone || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representee.telephone = body.telephone;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
