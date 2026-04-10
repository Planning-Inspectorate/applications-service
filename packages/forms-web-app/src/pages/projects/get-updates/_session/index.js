const { getGetUpdatesSession, setGetUpdatesSession } = require('./get-updates');
const {
	getGetUpdatesSubscriptionLinkSentSession,
	setGetUpdatesSubscriptionLinkSentSession
} = require('./get-updates-subscription-link-sent');
const {
	getGetUpdatesUnsubscribedSession,
	setGetUpdatesUnsubscribedSession
} = require('./get-updates-unsubscribed');
const { setOrRemoveGetUpdatesSession } = require('./set-or-remove-get-updates-session');

module.exports = {
	getGetUpdatesSession,
	setGetUpdatesSession,
	getGetUpdatesSubscriptionLinkSentSession,
	setGetUpdatesSubscriptionLinkSentSession,
	getGetUpdatesUnsubscribedSession,
	setGetUpdatesUnsubscribedSession,
	setOrRemoveGetUpdatesSession
};
