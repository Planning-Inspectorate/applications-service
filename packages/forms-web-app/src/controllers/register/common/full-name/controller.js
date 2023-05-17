const {
	VIEW: {
		REGISTER: {
			COMMON: { FULL_NAME_VIEW }
		}
	}
} = require('../../../../lib/views');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getRedirectUrl } = require('./get-redirect-url');
const { viewModel } = require('./viewModel');
const logger = require('../../../../lib/logger');
const { getSession, setSession } = require('../session');

const fullNameKey = 'full-name';
const getFullName = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);

		const fullName = getSession(session, key)[fullNameKey];
		return res.render(FULL_NAME_VIEW, {
			...viewModel[key],
			fullName
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};
const postFullName = (req, res) => {
	try {
		const { body, query, originalUrl, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		const key = getKeyFromUrl(originalUrl);

		if (errors[fullNameKey] || Object.keys(errors).length > 0) {
			return res.render(FULL_NAME_VIEW, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, fullNameKey, body[fullNameKey]);
		const redirectUrl = getRedirectUrl(query, key);

		return res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getFullName,
	postFullName
};
