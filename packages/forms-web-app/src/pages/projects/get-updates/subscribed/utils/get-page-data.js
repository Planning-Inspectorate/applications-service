const { getUpdatesIndexURL } = require('../../index/utils/get-updates-index-url');
const { getSubscriptionStatus } = require('./get-subscription-status');
const { getTitles } = require('./get-titles');

const getPageData = (responseCode, caseRef) => ({
	...getTitles(responseCode),
	getUpdatesStartRoute: getUpdatesIndexURL(caseRef),
	subscriptionStatus: getSubscriptionStatus(responseCode)
});

module.exports = { getPageData };
