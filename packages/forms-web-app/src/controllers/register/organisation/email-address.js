const { VIEW } = require('../../../lib/views');

exports.getEmail = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.EMAIL, { email: req.session.orgRegdata.email });
};

exports.postEmail = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.email || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.EMAIL, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata.email = body.email;

	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.ADDRESS}`);
	}
};
