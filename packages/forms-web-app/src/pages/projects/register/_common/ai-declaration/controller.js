const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const logger = require('../../../../../lib/logger');
const { getRedirectURL } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/ai-declaration/view.njk';
const aiDeclarationKey = 'ai-declaration';

const getRegisterAiDeclarationController = (req, res) => {
	try {
		const { session, originalUrl } = req;

		const key = getKeyFromUrl(originalUrl);
		const aiDeclaration = session[aiDeclarationKey];

		return res.render(view, {
			key,
			aiDeclaration
		});
	} catch (error) {
		logger.error(error);
		throw error;
	}
};

const postRegisterAiDeclarationController = (req, res) => {
	try {
		const { body, originalUrl, params, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const { case_ref } = params;

		const key = getKeyFromUrl(originalUrl);

		if (errors[aiDeclarationKey] || Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				key
			});
		}

		session[aiDeclarationKey] = body[aiDeclarationKey];

		const redirectURL = getRedirectURL(session, case_ref);

		res.redirect(redirectURL);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterAiDeclarationController,
	postRegisterAiDeclarationController
};
