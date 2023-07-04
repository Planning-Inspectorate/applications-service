const { VIEW } = require('../../../lib/views');

exports.getOrganisationName = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.ORGANISATION_NAME, {
		organisationName: req.session.behalfRegdata.representor['organisation-name']
	});
};

exports.postOrganisationName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['organisation-name'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.ORGANISATION_NAME, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representor['organisation-name'] = body['organisation-name'];

	const redirectUrl =
		req.query.mode === 'edit' ? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS : VIEW.REGISTER.AGENT.EMAIL;
	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
