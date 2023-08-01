const getUpdatesSessionId = 'getUpdates';

const getGetUpdatesSession = (session) => session[getUpdatesSessionId];

const setGetUpdatesSession = (session) => (session[getUpdatesSessionId] = {});

module.exports = { getGetUpdatesSession, setGetUpdatesSession };
