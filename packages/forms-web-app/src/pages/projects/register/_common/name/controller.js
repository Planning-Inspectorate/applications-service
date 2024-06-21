const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getRedirectUrl } = require('./_utils/get-redirect-url');
const { getViewModel } = require('./_utils/viewModel');
const logger = require('../../../../../lib/logger');
const { getSession, setSession } = require('../../../../../controllers/register/common/session');

const view = 'projects/register/_common/name/view.njk';
const fullNameKey = 'full-name';

const getRegisterNameController = (req, res) => {
	try {
		const { session, i18n } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const fullName = getSession(session, key)[fullNameKey];
		const viewModel = getViewModel(i18n);

		return res.render(view, {
			...viewModel[key],
			fullName
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterNameController = (req, res) => {
	try {
		const { body, query, originalUrl, session, i18n } = req;
		const { errors = {}, errorSummary = [] } = body;

		const key = getKeyFromUrl(originalUrl);
		const viewModel = getViewModel(i18n);

		if (errors[fullNameKey] || Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}

		setSession(session, key, fullNameKey, body[fullNameKey]);

		return res.redirect(`${res.locals.baseUrl}${getRedirectUrl(query, key)}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterNameController,
	postRegisterNameController
};
