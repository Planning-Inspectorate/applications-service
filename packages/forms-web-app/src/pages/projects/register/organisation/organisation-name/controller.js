const { VIEW } = require('../../../../../lib/views');

const view = 'projects/register/organisation/organisation-name/view.njk';

const getRegisterOrganisationOrgNameController = (req, res) => {
	res.render(view, {
		organisationName: req.session.orgRegdata['organisation-name']
	});
};

const postRegisterOrganisationOrgNameController = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['organisation-name'] || Object.keys(errors).length > 0) {
		return res.render(view, {
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

module.exports = {
	getRegisterOrganisationOrgNameController,
	postRegisterOrganisationOrgNameController
};
