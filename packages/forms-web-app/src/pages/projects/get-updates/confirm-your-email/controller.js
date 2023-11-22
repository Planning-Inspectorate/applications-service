const logger = require('../../../../lib/logger');
const { getGetUpdatesSubscriptionLinkSentSession } = require('../_session');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/confirm-your-email/view.njk';

const getGetUpdatesConfirmYourEmailController = (req, res, next) => {
	try {
		const {
			session,
			params: { case_ref: caseRef }
		} = req;

		if (!getGetUpdatesSubscriptionLinkSentSession(session))
			throw new Error('Get updates subscription link sent session value not true');

		return res.render(view, getPageData(session, caseRef));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getGetUpdatesConfirmYourEmailController
};
