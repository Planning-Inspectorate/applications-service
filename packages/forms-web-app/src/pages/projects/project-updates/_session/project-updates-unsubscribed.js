const { getProjectUpdatesSession } = require('./project-updates');

const projectUpdatesUnsubscribedSessionId = 'unsubscribed';

const getProjectUpdatesUnsubscribedSession = (session) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	return projectUpdatesSession[projectUpdatesUnsubscribedSessionId];
};

const setProjectUpdatesUnsubscribedSession = (session, unsubscribed) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	projectUpdatesSession[projectUpdatesUnsubscribedSessionId] = unsubscribed;
};

module.exports = { getProjectUpdatesUnsubscribedSession, setProjectUpdatesUnsubscribedSession };
