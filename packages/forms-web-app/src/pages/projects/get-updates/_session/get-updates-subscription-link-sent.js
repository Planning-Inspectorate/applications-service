const { getGetUpdatesSession } = require('./get-updates');

const getUpdatesSubscriptionLinkSentSessionId = 'subscriptionLinkSent';

const getGetUpdatesSubscriptionLinkSentSession = (session) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	return getUpdatesSession[getUpdatesSubscriptionLinkSentSessionId];
};

const setGetUpdatesSubscriptionLinkSentSession = (session, subscriptionLinkSent) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	getUpdatesSession[getUpdatesSubscriptionLinkSentSessionId] = subscriptionLinkSent;
};

module.exports = {
	getGetUpdatesSubscriptionLinkSentSession,
	setGetUpdatesSubscriptionLinkSentSession
};
