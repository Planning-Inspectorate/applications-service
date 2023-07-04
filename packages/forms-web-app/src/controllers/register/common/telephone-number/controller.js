const {
	VIEW: {
		REGISTER: {
			COMMON: { TELEPHONE_NUMBER_VIEW }
		}
	}
} = require('../../../../lib/views');
const { getRedirectUrl } = require('./get-redirect-url');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSession, setSession } = require('../session');
const { viewModel } = require('./viewModel');
const logger = require('../../../../lib/logger');

const telephoneNumberKey = 'telephone';
const getTelephoneNumber = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);

		const telephone = getSession(session, key)[telephoneNumberKey];
		return res.render(TELEPHONE_NUMBER_VIEW, {
			...viewModel[key],
			telephone
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postTelephoneNumber = (req, res) => {
	try {
		const { body, query, originalUrl, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const key = getKeyFromUrl(originalUrl);

		if (errors[telephoneNumberKey] || Object.keys(errors).length > 0) {
			return res.render(TELEPHONE_NUMBER_VIEW, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, telephoneNumberKey, body[telephoneNumberKey]);

		return res.redirect(`${res.locals.baseUrl}${getRedirectUrl(query, key)}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getTelephoneNumber,
	postTelephoneNumber
};
