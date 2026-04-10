const getUpdatesSessionId = 'getUpdates';

const getGetUpdatesSession = (session) => session[getUpdatesSessionId];

const setGetUpdatesSession = (session, caseRef) =>
	(session[getUpdatesSessionId] = {
		caseRef: caseRef
	});

module.exports = { getGetUpdatesSession, setGetUpdatesSession };
