const {
	getRegisterOrganisationCheckAnswersURL
} = require('../check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterOrganisationEmailURL
} = require('../email/_utils/get-register-organisation-email-url');

const view = 'projects/register/organisation/job-title/view.njk';

const getRegisterOrganisationJobTitleController = (req, res) =>
	res.render(view, { role: req.session.orgRegdata.role });

const postRegisterOrganisationJobTitleController = (req, res) => {
	const { body, params } = req;
	const { case_ref } = params;

	const { errors = {}, errorSummary = [] } = body;

	if (errors.role || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
	}

	req.session.orgRegdata.role = body.role;

	const redirectUrl =
		req.query.mode === 'edit'
			? getRegisterOrganisationCheckAnswersURL(case_ref)
			: getRegisterOrganisationEmailURL(case_ref);

	return res.redirect(redirectUrl);
};

module.exports = {
	getRegisterOrganisationJobTitleController,
	postRegisterOrganisationJobTitleController
};
