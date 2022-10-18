const { VIEW } = require('../../../lib/views');

exports.getEmail = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.EMAIL, { email: req.session.behalfRegdata.representor.email });
};

exports.postEmail = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.email || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.EMAIL, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representor.email = body.email;

	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.AGENT.TELEPHONE}`);
	}
};
