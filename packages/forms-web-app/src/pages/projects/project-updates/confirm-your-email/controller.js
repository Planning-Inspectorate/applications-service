const logger = require('../../../../lib/logger');
const { getProjectUpdatesSubscriptionLinkSentSession } = require('../_session');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-updates/confirm-your-email/view.njk';

const getProjectUpdatesConfirmYourEmail = (req, res, next) => {
	try {
		const { session } = req;

		if (!getProjectUpdatesSubscriptionLinkSentSession(session))
			throw new Error('Project updates subscription link sent session value not true');

		return res.render(view, getPageData(session));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectUpdatesConfirmYourEmail
};
