const { VIEW } = require('../../../lib/views');

exports.getAddress = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS, {
		address: req.session.behalfRegdata.representee.address
	});
};

exports.postAddress = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS, {
			errors,
			errorSummary,
			address: body
		});
		return;
	}

	req.session.behalfRegdata.representee.address.line1 = body.line1;
	req.session.behalfRegdata.representee.address.line2 = body.line2;
	req.session.behalfRegdata.representee.address.line3 = body.line3;
	req.session.behalfRegdata.representee.address.postcode = body.postcode;
	req.session.behalfRegdata.representee.address.country = body.country;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.REPRESENTEE_EMAIL;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
