const { VIEW } = require('../../../lib/views');

exports.getFullName = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.FULL_NAME, {
		fullName: req.session.orgRegdata['full-name']
	});
};

exports.postFullName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.FULL_NAME, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata['full-name'] = body['full-name'];
	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.OVER_18}`);
	}
};
