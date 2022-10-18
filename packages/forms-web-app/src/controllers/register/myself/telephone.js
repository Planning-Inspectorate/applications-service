const { VIEW } = require('../../../lib/views');

exports.getTelephone = (req, res) => {
	res.render(VIEW.REGISTER.MYSELF.TELEPHONE, { telephone: req.session.mySelfRegdata.telephone });
};

exports.postTelephone = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.telephone || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.MYSELF.TELEPHONE, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.mySelfRegdata.telephone = body.telephone;

	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT}`);
	}
};
