const logger = require('../../../../lib/logger');
const { putGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/subscribed/view.njk';

const getUpdatesSubscribedController = async (req, res) => {
	const { params, query, i18n } = req;
	const { case_ref: caseRef } = params;
	const { subscriptionDetails } = query;

	try {
		await putGetUpdatesSubscription(caseRef, subscriptionDetails);

		return res.render(view, getPageData(204, caseRef, i18n));
	} catch (error) {
		logger.error(error);

		if (error.message === 'Subscription details have expired')
			return res.render(view, getPageData(400, caseRef, i18n));

		return res.render(view, getPageData(500, caseRef, i18n));
	}
};

module.exports = {
	getUpdatesSubscribedController
};
