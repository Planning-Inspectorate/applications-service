const { VIEW } = require('../../../../../lib/views');

const view = 'projects/register/_common/about-project/view.njk';
const key = 'agent';

const getRegisterAgentAboutProjectController = (req, res) => {
	const { comment } = req.session;
	return res.render(view, { comment, key });
};

const postRegisterAgentAboutProjectController = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [] } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	const checkYourAnswers = `/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`;

	if (hasErrors) {
		res.render(view, {
			errors,
			errorSummary,
			comment,
			key
		});

		return;
	}

	const mode = req.query.mode ? req.query.mode.toString() : '';

	req.session.comment = comment;

	if (mode !== 'edit') {
		req.session.mode = 'final';
	}

	return res.redirect(`${res.locals.baseUrl}${checkYourAnswers}`);
};

module.exports = {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
};
