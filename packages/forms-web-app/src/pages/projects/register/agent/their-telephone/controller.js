const { VIEW } = require('../../../../../lib/views');

const view = 'projects/register/agent/their-telephone/view.njk';

const getRegisterAgentTheirTelephoneController = (req, res) => {
	return res.render(view, {
		telephone: req.session.behalfRegdata.representee.telephone
	});
};

const postRegisterAgentTheirTelephoneController = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors.telephone || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representee.telephone = body.telephone;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};

module.exports = {
	getRegisterAgentTheirTelephoneController,
	postRegisterAgentTheirTelephoneController
};
