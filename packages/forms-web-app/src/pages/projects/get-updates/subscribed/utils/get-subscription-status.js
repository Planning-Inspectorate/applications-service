const subscriptionStatuses = {
	204: 'successful',
	400: 'expired',
	500: 'unsuccessful'
};

const getSubscriptionStatus = (responseCode) => subscriptionStatuses[responseCode];

module.exports = { getSubscriptionStatus };
