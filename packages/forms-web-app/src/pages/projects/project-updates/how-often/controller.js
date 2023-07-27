const { postProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const logger = require('../../../../lib/logger');
const { projectUpdatesRoutes } = require('../_utils/project-updates-routes');
const { getPageData } = require('./utils/get-page-data');
const { formatHowOftenValue } = require('./utils/format-how-often-value');
const { inputNameId } = require('./config');
const {
	getProjectUpdatesEmailSession,
	setProjectUpdatesSubscriptionLinkSentSession
} = require('../_session');

const view = 'projects/project-updates/how-often/view.njk';

const getProjectUpdatesHowOften = (req, res, next) => {
	try {
		return res.render(view, getPageData());
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postProjectUpdatesHowOften = async (req, res) => {
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

		await postProjectUpdatesSubscription(case_ref, {
			email: getProjectUpdatesEmailSession(session),
			subscriptionTypes: formatHowOftenValue(body[inputNameId])
		});

		setProjectUpdatesSubscriptionLinkSentSession(session, true);

		return res.redirect(projectUpdatesRoutes.confirm);
	} catch (error) {
		logger.error(error);
		return res.status(500).render(view, getPageData('error'));
	}
};

module.exports = {
	getProjectUpdatesHowOften,
	postProjectUpdatesHowOften
};
