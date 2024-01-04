const {
	getRegisterOrganisationDeclarationURL
} = require('../declaration/_utils/get-register-organisation-declaration-url');

const getRegisterOrganisationCheckAnswersController = (req, res) => {
	const { session, params } = req;
	const { case_ref } = params;

	return res.render('projects/register/organisation/check-answers/view.njk', {
		data: {
			...session.orgRegdata,
			comment: session.comment
		},
		registerOrganisationDeclarationURL: getRegisterOrganisationDeclarationURL(case_ref)
	});
};

module.exports = { getRegisterOrganisationCheckAnswersController };
