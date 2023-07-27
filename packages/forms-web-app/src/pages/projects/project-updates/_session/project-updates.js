const projectUpdatesSessionId = 'projectUpdates';

const getProjectUpdatesSession = (session) => session[projectUpdatesSessionId];

const setProjectUpdatesSession = (session) => (session[projectUpdatesSessionId] = {});

module.exports = { getProjectUpdatesSession, setProjectUpdatesSession };
