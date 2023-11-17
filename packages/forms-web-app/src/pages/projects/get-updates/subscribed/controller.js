const logger = require('../../../../lib/logger');
const { putGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/subscribed/view.njk';

const getGetUpdatesSubscribed = async (req, res) => {
	const { params, query } = req;
	const { case_ref: caseRef } = params;
	const { subscriptionDetails } = query;

	try {
		await putGetUpdatesSubscription(caseRef, subscriptionDetails);

		return res.render(view, getPageData(204, caseRef));
	} catch (error) {
		logger.error(error);

		if (error.message === 'Subscription details have expired')
			return res.render(view, getPageData(400, caseRef));

		return res.render(view, getPageData(500, caseRef));
	}
};

module.exports = {
	getGetUpdatesSubscribed
};
