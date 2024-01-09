const { VIEW } = require('../../../../../lib/views');

const view = 'projects/register/agent/organisation-name/view.njk';

const getRegisterAgentOrgNameController = (req, res) => {
	return res.render(view, {
		organisationName: req.session.behalfRegdata.representor['organisation-name']
	});
};

const postRegisterAgentOrgNameController = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['organisation-name'] || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representor['organisation-name'] = body['organisation-name'];

	const redirectUrl =
		req.query.mode === 'edit' ? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS : VIEW.REGISTER.AGENT.EMAIL;
	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};

module.exports = {
	getRegisterAgentOrgNameController,
	postRegisterAgentOrgNameController
};
