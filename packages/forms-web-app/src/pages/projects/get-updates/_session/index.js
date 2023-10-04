const { getGetUpdatesSession, setGetUpdatesSession } = require('./get-updates');
const { getGetUpdatesEmailSession, setGetUpdatesEmailSession } = require('./get-updates-email');
const {
	getGetUpdatesSubscriptionLinkSentSession,
	setGetUpdatesSubscriptionLinkSentSession
} = require('./get-updates-subscription-link-sent');
const {
	getGetUpdatesUnsubscribedSession,
	setGetUpdatesUnsubscribedSession
} = require('./get-updates-unsubscribed');

module.exports = {
	getGetUpdatesSession,
	setGetUpdatesSession,
	getGetUpdatesEmailSession,
	setGetUpdatesEmailSession,
	getGetUpdatesSubscriptionLinkSentSession,
	setGetUpdatesSubscriptionLinkSentSession,
	getGetUpdatesUnsubscribedSession,
	setGetUpdatesUnsubscribedSession
};
