const logger = require('../../../../lib/logger');
const { putGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/subscribed/view.njk';

const getGetUpdatesSubscribed = async (req, res) => {
	try {
		const { params, query } = req;
		const { case_ref } = params;
		const { subscriptionDetails } = query;

		await putGetUpdatesSubscription(case_ref, subscriptionDetails);

		return res.render(view, getPageData(204));
	} catch (error) {
		logger.error(error);

		if (error.message === 'Subscription details have expired')
			return res.render(view, getPageData(400));

		return res.render(view, getPageData(500));
	}
};

module.exports = {
	getGetUpdatesSubscribed
};
