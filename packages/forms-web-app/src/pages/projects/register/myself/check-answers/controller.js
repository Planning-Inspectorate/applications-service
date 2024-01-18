const {
	getRegisterMyselfDeclarationURL
} = require('../declaration/_utils/get-register-myself-declaration-url');

const getRegisterMyselfCheckAnswersController = (req, res) => {
	const { session, params } = req;
	const { case_ref } = params;

	return res.render('projects/register/myself/check-answers/view.njk', {
		data: {
			...session.mySelfRegdata,
			comment: session.comment
		},
		registerMyselfDeclarationURL: getRegisterMyselfDeclarationURL(case_ref)
	});
};

module.exports = { getRegisterMyselfCheckAnswersController };
