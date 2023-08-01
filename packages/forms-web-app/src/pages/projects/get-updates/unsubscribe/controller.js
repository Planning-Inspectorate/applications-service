const logger = require('../../../../lib/logger');
const { deleteGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');
const { setGetUpdatesSession } = require('../_session/get-updates');
const { getUpdatesRoutes } = require('../_utils/get-updates-routes');
const { setGetUpdatesUnsubscribedSession } = require('../_session');

const view = 'projects/get-updates/unsubscribe/view.njk';

const getGetUpdatesUnsubscribe = (req, res, next) => {
	try {
		const { query } = req;

		return res.render(view, getPageData(query));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesUnsubscribe = async (req, res, next) => {
	try {
		const { body, params, session } = req;
		const { email } = body;
		const { case_ref } = params;

		await deleteGetUpdatesSubscription(case_ref, email);

		setGetUpdatesSession(session);
		setGetUpdatesUnsubscribedSession(session, true);

		return res.redirect(getUpdatesRoutes.unsubscribed);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getGetUpdatesUnsubscribe,
	postGetUpdatesUnsubscribe
};
