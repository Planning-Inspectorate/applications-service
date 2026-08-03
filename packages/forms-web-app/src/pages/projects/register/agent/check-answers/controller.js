const {
	getRegisterAgentDeclarationURL
} = require('../declaration/_utils/get-register-agent-declaration-url');

const getRegisterAgentCheckAnswersController = (req, res) => {
	const { session, params } = req;
	const { case_ref } = params;

	return res.render('projects/register/agent/check-answers/view.njk', {
		data: {
			...session.behalfRegdata,
			comment: session.comment,
			aiDeclaration: session['ai-declaration']
		},
		registerAgentDeclarationURL: getRegisterAgentDeclarationURL(case_ref)
	});
};

module.exports = { getRegisterAgentCheckAnswersController };
