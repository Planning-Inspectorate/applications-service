const {
	VIEW: { REGISTER: registerRoute }
} = require('../../../../../lib/views');

const view = 'projects/register/_common/about-project/view.njk';
const key = 'myself';

const getRegisterMyselfAboutProjectController = (req, res) => {
	const { comment } = req.session;
	return res.render(view, { comment, key });
};

const postRegisterMyselfAboutProjectController = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [] } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	const checkYourAnswers = `/${registerRoute.MYSELF.CHECK_YOUR_ANSWERS}`;

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

	return res.redirect(`${res.locals.baseUrl}${checkYourAnswers}`);
};

module.exports = {
	getRegisterMyselfAboutProjectController,
	postRegisterMyselfAboutProjectController
};
