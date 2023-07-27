const { getProjectUpdatesSession } = require('./project-updates');

const projectUpdatesSubscriptionLinkSentSessionId = 'subscriptionLinkSent';

const getProjectUpdatesSubscriptionLinkSentSession = (session) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	return projectUpdatesSession[projectUpdatesSubscriptionLinkSentSessionId];
};

const setProjectUpdatesSubscriptionLinkSentSession = (session, subscriptionLinkSent) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	projectUpdatesSession[projectUpdatesSubscriptionLinkSentSessionId] = subscriptionLinkSent;
};

module.exports = {
	getProjectUpdatesSubscriptionLinkSentSession,
	setProjectUpdatesSubscriptionLinkSentSession
};
