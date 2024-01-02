const { postRegistrationData } = require('../../../../../services/registration.service');
const logger = require('../../../../../lib/logger');
const { viewModel } = require('./_utils/viewModel');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSessionBase } = require('../../../../../controllers/register/common/session');
const { getRedirectUrl } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/declaration/view.njk';

const getRegisterDeclarationController = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		return res.render(view, {
			...viewModel[key]
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

		const response = await postRegistrationData(JSON.stringify(registrationData));
		sessionForKey.ipRefNo = response.data?.referenceId;

		return res.redirect(`${res.locals.baseUrl}${getRedirectUrl(key)}`);
	} catch (e) {
		logger.error(`Could not Post declaration, internal error occurred ${e}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterDeclarationController,
	postRegisterDeclarationController
};
