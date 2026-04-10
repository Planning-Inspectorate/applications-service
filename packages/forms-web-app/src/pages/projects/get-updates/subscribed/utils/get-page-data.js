const { getUpdatesIndexURL } = require('../../index/utils/get-updates-index-url');
const { getSubscriptionStatus } = require('./get-subscription-status');
const { getTitles } = require('./get-titles');

const getPageData = (responseCode, caseRef, i18n) => ({
	...getTitles(responseCode, i18n),
	getUpdatesStartRoute: getUpdatesIndexURL(caseRef),
	subscriptionStatus: getSubscriptionStatus(responseCode)
});

module.exports = { getPageData };
