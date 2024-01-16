const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSession, setSession } = require('../../../../../controllers/register/common/session');
const { viewModel } = require('./_utils/viewModel');
const logger = require('../../../../../lib/logger');
const { getRedirectUrl } = require('./_utils/get-redirect-url');

const view = 'projects/register/_common/are-you-18/view.njk';
const areYouOver18Key = 'over-18';

const getRegisterAreYou18Controller = (req, res) => {
	try {
		const { session, originalUrl } = req;
		const key = getKeyFromUrl(originalUrl);
		const over18 = getSession(session, key)[areYouOver18Key];
		return res.render(view, {
			...viewModel[key],
			over18
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterAreYou18Controller = (req, res) => {
	try {
		const { body, originalUrl, query, session } = req;
		const key = getKeyFromUrl(originalUrl);
		const { errors = {}, errorSummary = [] } = body;
		if (errors[areYouOver18Key] || Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}
		setSession(session, key, areYouOver18Key, body[areYouOver18Key]);
		res.redirect(`${res.locals.baseUrl}${getRedirectUrl(query, key)}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
};
