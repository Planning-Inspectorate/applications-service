const logger = require('../../../../lib/logger');
const { deleteProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');
const { setProjectUpdatesSession } = require('../_session/project-updates');
const { projectUpdatesRoutes } = require('../_utils/project-updates-routes');
const { setProjectUpdatesUnsubscribedSession } = require('../_session');

const view = 'projects/project-updates/unsubscribe/view.njk';

const getProjectUpdatesUnsubscribe = (req, res, next) => {
	try {
		const { query } = req;

		return res.render(view, getPageData(query));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postProjectUpdatesUnsubscribe = async (req, res, next) => {
	try {
		const { body, params, session } = req;
		const { email } = body;
		const { case_ref } = params;

		await deleteProjectUpdatesSubscription(case_ref, email);

		setProjectUpdatesSession(session);
		setProjectUpdatesUnsubscribedSession(session, true);

		return res.redirect(projectUpdatesRoutes.unsubscribed);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectUpdatesUnsubscribe,
	postProjectUpdatesUnsubscribe
};
