const {
	VIEW: {
		REGISTER: {
			COMMON: { DECLARATION }
		}
	}
} = require('../../../../lib/views');
const { postRegistrationData } = require('../../../../services/registration.service');
const logger = require('../../../../lib/logger');
const { viewModel } = require('./viewModel');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSessionBase } = require('../session');
const { getRedirectUrl } = require('./get-redirect-url');

const getDeclaration = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		return res.render(DECLARATION, {
			...viewModel[key]
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postDeclaration = async (req, res) => {
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
	getDeclaration,
	postDeclaration
};
