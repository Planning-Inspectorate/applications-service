const { postRegistration } = require('../../../../../lib/application-api-wrapper');
const logger = require('../../../../../lib/logger');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const {
	getSessionBase,
	setSession,
	getSession
} = require('../../../../../controllers/register/common/session');
const { getRedirectUrl, getAlreadySubmittedUrl } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/declaration/view.njk';
const hasSubmittedKey = 'hasSubmitted';

const getRegisterDeclarationController = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const userSessionData = getSession(session, key);

		if (userSessionData?.hasSubmitted) {
			return res.redirect(`${res.locals.baseUrl}${getAlreadySubmittedUrl(key)}`);
		}

		return res.render(view, {
			key
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterDeclarationController = async (req, res) => {
	try {
		const { session, params } = req;
		const { case_ref } = params;
		const key = getKeyFromUrl(req.originalUrl);

		const sessionForKey = getSessionBase(session, key);
		sessionForKey.case_ref = case_ref;

		const registrationData = {
			...sessionForKey,
			comment: session.comment
		};

		const response = await postRegistration(JSON.stringify(registrationData));
		sessionForKey.ipRefNo = response.data?.referenceId;

		setSession(session, key, hasSubmittedKey, true);
		return res.redirect(`${res.locals.baseUrl}${getRedirectUrl(key)}`);
	} catch (e) {
		logger.error(`Could not Post declaration, internal error occurred ${e}`);
		return res.status(500).render('error/have-your-say-journey-error');
	}
};

module.exports = {
	getRegisterDeclarationController,
	postRegisterDeclarationController
};
