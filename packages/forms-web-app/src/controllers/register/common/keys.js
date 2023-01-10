const keys = {
	myself: 'myself',
	organisation: 'organisation',
	agent: 'agent'
};

const objectHandler = {
	[keys.myself]: {
		key: keys.myself,
		upperCaseKey: keys.myself.toUpperCase(),
		sessionKey: 'mySelfRegdata',
		getSession: function (session) {
			return session[this.sessionKey];
		},
		setSession: function (session, key, value) {
			session[this.sessionKey][key] = value;
		}
	},
	[keys.organisation]: {
		key: keys.organisation,
		upperCaseKey: keys.organisation.toUpperCase(),
		sessionKey: 'orgRegdata',
		getSession: function (session) {
			return session[this.sessionKey];
		},
		setSession: function (session, key, value) {
			session[this.sessionKey][key] = value;
		}
	},
	[keys.agent]: {
		key: keys.agent,
		upperCaseKey: keys.agent.toUpperCase(),
		sessionKey: 'behalfRegdata',
		getSession: function (session) {
			return session[this.sessionKey].representor;
		},
		setSession: function (session, key, value) {
			session[this.sessionKey].representor[key] = value;
		}
	}
};

module.exports = {
	keys,
	objectHandler
};
