const { keys } = require('./keys');

const sessionKeys = {
	[keys.myself]: 'mySelfRegdata',
	[keys.organisation]: 'orgRegdata',
	[keys.agent]: 'behalfRegdata'
};

const getSession = (session, key) =>
	key === keys.agent ? session[sessionKeys[key]].representor : session[sessionKeys[key]];

const getSessionBase = (session, key) => session[sessionKeys[key]];
const setSession = (session, key, otherKey, sessionValue) =>
	key === keys.agent
		? (session[sessionKeys[key]].representor[otherKey] = sessionValue)
		: (session[sessionKeys[key]][otherKey] = sessionValue);

module.exports = {
	getSession,
	getSessionBase,
	setSession
};
