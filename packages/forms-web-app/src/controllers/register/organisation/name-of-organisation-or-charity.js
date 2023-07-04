const { VIEW } = require('../../../lib/views');

exports.getOrganisationName = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME, {
		organisationName: req.session.orgRegdata['organisation-name']
	});
};

exports.postOrganisationName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['organisation-name'] || Object.keys(errors).length > 0) {
		return res.render(VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME, {
			errors,
			errorSummary
		});
	}

	req.session.orgRegdata['organisation-name'] = body['organisation-name'];

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.ORGANISATION.ROLE;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};
