const { getProjectUpdatesSession } = require('./project-updates');

const projectUpdatesEmailSessionId = 'email';

const getProjectUpdatesEmailSession = (session) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	return projectUpdatesSession[projectUpdatesEmailSessionId];
};

const setProjectUpdatesEmailSession = (session, email) => {
	const projectUpdatesSession = getProjectUpdatesSession(session);

	projectUpdatesSession[projectUpdatesEmailSessionId] = email;
};

module.exports = { getProjectUpdatesEmailSession, setProjectUpdatesEmailSession };
