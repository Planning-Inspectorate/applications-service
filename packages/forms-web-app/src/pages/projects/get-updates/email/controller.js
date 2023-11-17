const logger = require('../../../../lib/logger');
const { setGetUpdatesEmailSession } = require('../_session');
const { getUpdatesRoutes } = require('../_utils/get-updates-url');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/email/view.njk';

const getGetUpdatesEmail = (req, res, next) => {
	try {
		const { session } = req;

		return res.render(view, getPageData(session));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesEmail = async (req, res, next) => {
	try {
		const { body, session } = req;
		const { errors, errorSummary } = body;
		const { email } = body;

		if (errors) {
			return res.render(view, {
				...getPageData(session),
				email: errors.email.value,
				errors,
				errorSummary
			});
		}

		setGetUpdatesEmailSession(session, email);

		return res.redirect(getUpdatesRoutes.howOften);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getGetUpdatesEmail,
	postGetUpdatesEmail
};
