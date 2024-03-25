const logger = require('../../../../../lib/logger');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSession, setSession } = require('../../../../../controllers/register/common/session');
const { getRedirectURL } = require('./_utils/get-redirect-url');
const { viewModel } = require('./_utils/viewModel');

const view = 'projects/register/_common/number/view.njk';
const telephoneNumberKey = 'telephone';

const getRegisterNumberController = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const telephone = getSession(session, key)[telephoneNumberKey];

		return res.render(view, {
			...viewModel[key],
			telephone
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterNumberController = (req, res) => {
	try {
		const { body, originalUrl, params, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const { case_ref } = params;

		const key = getKeyFromUrl(originalUrl);

		if (errors[telephoneNumberKey] || Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, telephoneNumberKey, body[telephoneNumberKey]);

		const redirectURL = getRedirectURL(session, case_ref, query);

		return res.redirect(redirectURL);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterNumberController,
	postRegisterNumberController
};
