const { VIEW } = require('../../../lib/views');

exports.getOver18 = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.OVER_18, { over18: req.session.orgRegdata['over-18'] });
};

exports.postOver18 = (req, res) => {
	const { body } = req;
	const over18 = body['over-18'];
	const { errors = {}, errorSummary = [] } = body;
	if (errors['over-18'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.OVER_18, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata['over-18'] = over18;

	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME}`);
	}
};
