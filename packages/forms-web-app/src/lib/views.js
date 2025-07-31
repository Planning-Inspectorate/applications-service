const VIEW = {
	APPLICATION_NUMBER: 'application-number',
	PROJECTS: {
		PROJECT: 'projects/index',
		DOCUMENTS: 'projects/documents',
		REPRESENTATIONS: 'projects/representations',
		TIMETABLE: 'projects/examination-timetable',
		RECOMMENDATIONS: 'projects/recommendations',
		REPRESENTATION: 'projects/representation'
	},
	PROJECT_SEARCH: 'project-search',
	GUIDANCE_PAGES: {
		BEFORE_APPLY: 'guidance-pages/before-apply'
	},
	REGISTER: {
		START: 'register/start',
		MYSELF: {
			OVER_18: 'register/myself/are-you-18-over',
			EMAIL_ADDRESS: 'register/myself/email-address',
			CHECK_YOUR_ANSWERS: 'register/myself/check-answers',
			DECLARATION: 'register/myself/declaration',
			REGISTRATION_COMPLETE: 'register/myself/registration-complete',
			ALREADY_REGISTERED: 'register/myself/already-registered'
		},
		ORGANISATION: {
			OVER_18: 'register/organisation/are-you-18-over',
			ORGANISATION_NAME: 'register/organisation/name-of-organisation-or-charity',
			ROLE: 'register/organisation/what-job-title-or-role',
			EMAIL: 'register/organisation/email-address',
			CHECK_YOUR_ANSWERS: 'register/organisation/check-answers',
			DECLARATION: 'register/organisation/declaration',
			REGISTRATION_COMPLETE: 'register/organisation/registration-complete',
			ALREADY_REGISTERED: 'register/organisation/already-registered'
		},
		AGENT: {
			REPRESENTEE_NAME: 'register/agent/name-person-representing',
			REPRESENTEE_NAME_HOUSEHOLD: 'register/agent/name-household-representing',
			REPRESENTEE_NAME_ORGANISATION: 'register/agent/name-organisation-representing',
			REPRESENTEE_OVER_18: 'register/agent/are-they-18-over',
			ORGANISATION_NAME: 'register/agent/name-of-organisation',
			CHECK_YOUR_ANSWERS: 'register/agent/check-answers',
			DECLARATION: 'register/agent/declaration',
			REGISTRATION_COMPLETE: 'register/agent/registration-complete',
			ALREADY_REGISTERED: 'register/agent/already-registered'
		}
	},
	EXAMINATION: {
		ROUTE_PREFIX: 'pages/examination/',
		YOUR_NAME: 'name',
		YOUR_EMAIL_ADDRESS: 'your-email-address',
		WHO_ARE_YOU_SUBMITTING_FOR: 'who-are-you-submitting-for',
		HAVE_YOUR_SAY_DURING_EXAMINATION: 'have-your-say'
	}
};

module.exports = {
	VIEW
};
