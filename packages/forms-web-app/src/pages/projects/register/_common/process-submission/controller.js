const { postRegistration } = require('../../../../../lib/application-api-wrapper');
const logger = require('../../../../../lib/logger');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const {
	getSessionBase,
	setSession
} = require('../../../../../controllers/register/common/session');
const { getRedirectUrl } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/process-submission/view.njk';
const hasSubmittedKey = 'hasSubmitted';

const getProcessSubmission = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		return res.render(view, { key });
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postProcessSubmission = async (req, res) => {
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
		logger.error(`Could not process registration submission, internal error occurred ${e}`);
		return res.status(500).render('error/have-your-say-journey-error');
	}
};
module.exports = {
	getProcessSubmission,
	postProcessSubmission
};
