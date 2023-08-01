const { getGetUpdatesSession } = require('./get-updates');

const getUpdatesEmailSessionId = 'email';

const getGetUpdatesEmailSession = (session) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	return getUpdatesSession[getUpdatesEmailSessionId];
};

const setGetUpdatesEmailSession = (session, email) => {
	const getUpdatesSession = getGetUpdatesSession(session);

	getUpdatesSession[getUpdatesEmailSessionId] = email;
};

module.exports = { getGetUpdatesEmailSession, setGetUpdatesEmailSession };
