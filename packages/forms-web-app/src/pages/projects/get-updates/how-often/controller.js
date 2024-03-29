const { postGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const logger = require('../../../../lib/logger');
const {
	getUpdatesConfirmYourEmailURL
} = require('../confirm-your-email/utils/get-updates-confirm-your-email-url');
const { getPageData } = require('./utils/get-page-data');
const { formatHowOftenValue } = require('./utils/format-how-often-value');
const {
	inputNameId,
	howOftenViewMode: { indexView, errorView }
} = require('./config');
const {
	getGetUpdatesEmailSession,
	setGetUpdatesSubscriptionLinkSentSession
} = require('../_session');

const view = 'projects/get-updates/how-often/view.njk';

const getGetUpdatesHowOftenController = (req, res, next) => {
	const {
		params: { case_ref: caseRef }
	} = req;

	try {
		return res.render(view, getPageData(indexView, caseRef));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesHowOftenController = async (req, res) => {
	const { body, params, session } = req;
	const { errors, errorSummary } = body;
	const { case_ref: caseRef } = params;

	try {
		if (errors) {
			return res.render(view, {
				...getPageData(indexView, caseRef),
				errors,
				errorSummary
			});
		}

		await postGetUpdatesSubscription(caseRef, {
			email: getGetUpdatesEmailSession(session),
			subscriptionTypes: formatHowOftenValue(body[inputNameId])
		});

		setGetUpdatesSubscriptionLinkSentSession(session, true);

		return res.redirect(getUpdatesConfirmYourEmailURL(caseRef));
	} catch (error) {
		logger.error(error);
		return res.status(500).render(view, getPageData(errorView, caseRef));
	}
};

module.exports = {
	getGetUpdatesHowOftenController,
	postGetUpdatesHowOftenController
};
