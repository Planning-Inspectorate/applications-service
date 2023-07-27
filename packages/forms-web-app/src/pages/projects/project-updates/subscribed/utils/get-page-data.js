const { projectUpdatesRoutes } = require('../../_utils/project-updates-routes');
const { getSubscriptionStatus } = require('./get-subscription-status');
const { getTitles } = require('./get-titles');

const getPageData = (responseCode) => ({
	...getTitles(responseCode),
	projectUpdatesStartRoute: projectUpdatesRoutes.start,
	subscriptionStatus: getSubscriptionStatus(responseCode)
});

module.exports = { getPageData };
