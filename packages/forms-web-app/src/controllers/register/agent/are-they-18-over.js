const { VIEW } = require('../../../lib/views');

exports.getOver18 = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18, {
		over18: req.session.behalfRegdata.representee['over-18']
	});
};

exports.postOver18 = (req, res) => {
	const { body } = req;
	const over18 = body['over-18'];
	const { errors = {}, errorSummary = [] } = body;
	if (errors['over-18'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representee['over-18'] = over18;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS;
	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
