const logger = require('../../../../lib/logger');
const { putProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-updates/subscribed/view.njk';

const getProjectUpdatesSubscribed = async (req, res) => {
	try {
		const { params, query } = req;
		const { case_ref } = params;
		const { subscription } = query;

		await putProjectUpdatesSubscription(case_ref, subscription);

		return res.render(view, getPageData(204));
	} catch (error) {
		logger.error(error);

		if (error.message === 'Subscription details have expired')
			return res.render(view, getPageData(400));

		return res.render(view, getPageData(500));
	}
};

module.exports = {
	getProjectUpdatesSubscribed
};
