const { getGetUpdatesSession } = require('./get-updates');

const getUpdatesUnsubscribedSessionId = 'unsubscribed';

const getGetUpdatesUnsubscribedSession = (session) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	return getUpdatesSession[getUpdatesUnsubscribedSessionId];
};

const setGetUpdatesUnsubscribedSession = (session, unsubscribed) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	getUpdatesSession[getUpdatesUnsubscribedSessionId] = unsubscribed;
};

module.exports = { getGetUpdatesUnsubscribedSession, setGetUpdatesUnsubscribedSession };
