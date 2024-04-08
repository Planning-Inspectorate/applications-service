const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSession, setSession } = require('../../../../../controllers/register/common/session');
const { viewModel } = require('./_utils/viewModel');
const { getRedirectURL } = require('./_utils/get-redirect-url');
const logger = require('../../../../../lib/logger');

const view = 'projects/register/_common/email/view.njk';
const emailAddressKey = 'email';

const getRegisterEmailController = (req, res) => {
	try {
		const { session, originalUrl } = req;
		const key = getKeyFromUrl(originalUrl);
		const email = getSession(session, key)[emailAddressKey];

		return res.render(view, {
			...viewModel[key],
			email
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterEmailController = (req, res) => {
	try {
		const { body, originalUrl, params, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const { case_ref } = params;

		const key = getKeyFromUrl(originalUrl);

		if (errors[emailAddressKey] || Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, emailAddressKey, body[emailAddressKey]);

		const redirectURL = getRedirectURL(session, case_ref, query);

		return res.redirect(redirectURL);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterEmailController,
	postRegisterEmailController
};
