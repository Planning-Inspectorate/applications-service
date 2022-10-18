const { VIEW } = require('../../../lib/views');

exports.getRole = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.ROLE, { role: req.session.orgRegdata.role });
};

exports.postRole = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors.role || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.ROLE, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata.role = body.role;
	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.EMAIL}`);
	}
};
