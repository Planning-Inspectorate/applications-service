const logger = require('../../../../lib/logger');
const { setProjectUpdatesEmailSession } = require('../_session');
const { projectUpdatesRoutes } = require('../_utils/project-updates-routes');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-updates/email/view.njk';

const getProjectUpdatesEmail = (req, res, next) => {
	try {
		const { session } = req;

		return res.render(view, getPageData(session));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postProjectUpdatesEmail = async (req, res, next) => {
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

		setProjectUpdatesEmailSession(session, email);

		return res.redirect(projectUpdatesRoutes.howOften);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectUpdatesEmail,
	postProjectUpdatesEmail
};
