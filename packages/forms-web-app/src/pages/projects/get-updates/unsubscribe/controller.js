const logger = require('../../../../lib/logger');
const { deleteGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');
const { setGetUpdatesSession } = require('../_session/get-updates');
const { setGetUpdatesUnsubscribedSession } = require('../_session');
const { getUpdatesUnsubscribedURL } = require('../unsubscribed/utils/get-updates-unsubscribed-url');

const view = 'projects/get-updates/unsubscribe/view.njk';

const getGetUpdatesUnsubscribeController = (req, res, next) => {
	try {
		const { query } = req;

		return res.render(view, getPageData(query));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesUnsubscribeController = async (req, res, next) => {
	try {
		const { body, params, session } = req;
		const { email } = body;
		const { case_ref: caseRef } = params;

		await deleteGetUpdatesSubscription(caseRef, email);

		setGetUpdatesSession(session);
		setGetUpdatesUnsubscribedSession(session, true);

		return res.redirect(getUpdatesUnsubscribedURL(caseRef));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
};
