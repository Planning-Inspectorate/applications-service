const { getRedirectURL } = require('../../_common/about-project/_utils/get-redirect-url');

const view = 'projects/register/_common/about-project/view.njk';
const key = 'organisation';

const getRegisterOrganisationAboutProjectController = (req, res) => {
	const { comment } = req.session;
	return res.render(view, { comment, key });
};

const postRegisterOrganisationAboutProjectController = async (req, res) => {
	const { body, params, query, session } = req;
	const { comment, errors = {}, errorSummary = [] } = body;
	const { case_ref } = params;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	if (hasErrors) {
		return res.render(view, {
			errors,
			errorSummary,
			comment,
			key
		});
	}

	const mode = req.query.mode ? req.query.mode.toString() : '';

	req.session.comment = comment;

	if (mode !== 'edit') {
		req.session.mode = 'final';
	}

	const redirectUrl = getRedirectURL(session, case_ref, query);

	return res.redirect(redirectUrl);
};

module.exports = {
	getRegisterOrganisationAboutProjectController,
	postRegisterOrganisationAboutProjectController
};
