const logger = require('../../../../../lib/logger');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSession } = require('../../../../../controllers/register/common/session');
const { getRedirectUrl, getAlreadySubmittedUrl } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/declaration/view.njk';

const getRegisterDeclarationController = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const userSessionData = getSession(session, key);

		if (userSessionData?.hasSubmitted) {
			return res.redirect(`${res.locals.baseUrl}${getAlreadySubmittedUrl(key)}`);
		}

		return res.render(view, {
			key,
			nextPageUrl: `${res.locals.baseUrl}${getRedirectUrl(key)}`
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = {
	getRegisterDeclarationController
};
