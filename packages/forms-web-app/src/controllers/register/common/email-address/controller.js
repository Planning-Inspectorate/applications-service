const {
	VIEW: {
		REGISTER: {
			COMMON: { EMAIL_ADDRESS_VIEW }
		}
	}
} = require('../../../../lib/views');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSession, setSession } = require('../session');
const { viewModel } = require('./viewModel');
const { getRedirectUrl } = require('./get-redirect-url');
const logger = require('../../../../lib/logger');

const emailAddressKey = 'email';
const getEmailAddress = (req, res) => {
	try {
		const { session, originalUrl } = req;
		const key = getKeyFromUrl(originalUrl);
		const email = getSession(session, key)[emailAddressKey];
		return res.render(EMAIL_ADDRESS_VIEW, {
			...viewModel[key],
			email
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postEmailAddress = (req, res) => {
	try {
		const { body, originalUrl, query, session } = req;
		const key = getKeyFromUrl(originalUrl);

		const { errors = {}, errorSummary = [] } = body;
		if (errors[emailAddressKey] || Object.keys(errors).length > 0) {
			return res.render(EMAIL_ADDRESS_VIEW, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, emailAddressKey, body[emailAddressKey]);

		return res.redirect(getRedirectUrl(query, key));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEmailAddress,
	postEmailAddress
};
