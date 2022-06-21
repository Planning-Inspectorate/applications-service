const { VIEW } = require('../../../lib/views');

exports.getAddress = async (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.ADDRESS, { address: req.session.orgRegdata.address });
};

exports.postAddress = async (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.ADDRESS, {
			errors,
			errorSummary,
			address: body
		});
		return;
	}

	req.session.orgRegdata.address.line1 = body.line1;
	req.session.orgRegdata.address.line2 = body.line2;
	req.session.orgRegdata.address.line3 = body.line3;
	req.session.orgRegdata.address.postcode = body.postcode;
	req.session.orgRegdata.address.country = body.country;
	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.TELEPHONE}`);
	}
};
