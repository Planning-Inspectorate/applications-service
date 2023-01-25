const {
	VIEW: {
		REGISTER: {
			COMMON: { ARE_YOU_OVER_18 }
		}
	}
} = require('../../../../lib/views');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSession, setSession } = require('../session');
const { viewModel } = require('./viewModel');
const logger = require('../../../../lib/logger');
const { getRedirectUrl } = require('./get-redirect-url');

const areYouOver18Key = 'over-18';
const getAreYouOver18 = (req, res) => {
	try {
		const { session, originalUrl } = req;
		const key = getKeyFromUrl(originalUrl);
		const over18 = getSession(session, key)[areYouOver18Key];
		return res.render(ARE_YOU_OVER_18, {
			...viewModel[key],
			over18
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postAreYouOver18 = (req, res) => {
	try {
		const { body, originalUrl, query, session } = req;
		const key = getKeyFromUrl(originalUrl);
		const { errors = {}, errorSummary = [] } = body;
		if (errors[areYouOver18Key] || Object.keys(errors).length > 0) {
			return res.render(ARE_YOU_OVER_18, {
				errors,
				errorSummary,
				...viewModel[key]
			});
		}
		setSession(session, key, areYouOver18Key, body[areYouOver18Key]);
		res.redirect(getRedirectUrl(query, key));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getAreYouOver18,
	postAreYouOver18
};
