const { getUpdatesRoutes } = require('../../_utils/get-updates-routes');
const { getSubscriptionStatus } = require('./get-subscription-status');
const { getTitles } = require('./get-titles');

const getPageData = (responseCode) => ({
	...getTitles(responseCode),
	getUpdatesStartRoute: getUpdatesRoutes.start,
	subscriptionStatus: getSubscriptionStatus(responseCode)
});

module.exports = { getPageData };
