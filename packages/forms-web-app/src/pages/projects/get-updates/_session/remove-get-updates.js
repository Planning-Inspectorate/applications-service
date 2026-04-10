const removeGetUpdatesSession = (session) => delete session.getUpdates;

module.exports = { removeGetUpdatesSession };
