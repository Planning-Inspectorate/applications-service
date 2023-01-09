const keys = {
	myself: 'myself',
	organisation: 'organisation',
	agent: 'agent'
};
const myselfObj = {
	key: keys.myself,
	upperCaseKey: keys.myself.toUpperCase(),
	sessionKey: 'mySelfRegdata',
	getSession: function (session) {
		return session[this.sessionKey];
	},
	setSession: function (session, key, value) {
		session[this.sessionKey][key] = value;
	},
	viewKey: {
		email: 'EMAIL_ADDRESS'
	}
};

const organisationObj = {
	upperCaseKey: keys.organisation.toUpperCase(),
	sessionKey: 'orgRegdata',
	getSession: function (session) {
		return session[this.sessionKey];
	},
	setSession: function (session, key, value) {
		session[this.sessionKey][key] = value;
	},
	viewKey: {
		email: 'EMAIL'
	}
};

const agentObj = {
	upperCaseKey: keys.agent.toUpperCase(),
	sessionKey: 'behalfRegdata',
	getSession: function (session) {
		return session[this.sessionKey].representor;
	},
	setSession: function (session, key, value) {
		session[this.sessionKey].representor[key] = value;
	}
};

module.exports = {
	keys,
	myselfObj,
	organisationObj,
	agentObj
};
