const { postGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const logger = require('../../../../lib/logger');
const { getUpdatesRoutes } = require('../_utils/get-updates-routes');
const { getPageData } = require('./utils/get-page-data');
const { formatHowOftenValue } = require('./utils/format-how-often-value');
const { inputNameId } = require('./config');
const {
	getGetUpdatesEmailSession,
	setGetUpdatesSubscriptionLinkSentSession
} = require('../_session');

const view = 'projects/get-updates/how-often/view.njk';

const getGetUpdatesHowOften = (req, res, next) => {
	try {
		return res.render(view, getPageData());
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesHowOften = async (req, res) => {
	try {
		const { body, params, session } = req;
		const { errors, errorSummary } = body;
		const { case_ref } = params;

		if (errors) {
			return res.render(view, {
				...getPageData(),
				errors,
				errorSummary
			});
		}

		await postGetUpdatesSubscription(case_ref, {
			email: getGetUpdatesEmailSession(session),
			subscriptionTypes: formatHowOftenValue(body[inputNameId])
		});

		setGetUpdatesSubscriptionLinkSentSession(session, true);

		return res.redirect(getUpdatesRoutes.confirm);
	} catch (error) {
		logger.error(error);
		return res.status(500).render(view, getPageData('error'));
	}
};

module.exports = {
	getGetUpdatesHowOften,
	postGetUpdatesHowOften
};
