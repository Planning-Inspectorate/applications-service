const VIEW = {
	APPLICATION_NUMBER: 'application-number',

	COOKIES: 'cookies',
	PROJECTS: {
		PROJECT: 'projects/index',
		PROJECT_TIMELINE: 'projects/project-timeline',
		DOCUMENTS: 'projects/documents',
		REPRESENTATIONS: 'projects/representations',
		TIMETABLE: 'projects/timetable',
		ALL_EXAMINATION_DOCUMENTS: 'projects/all-examination-documents',
		RECOMMENDATIONS: 'projects/recommendations',
		REPRESENTATION: 'projects/representation'
	},
	PROJECT_SEARCH: 'project-search',
	GUIDANCE_PAGES: {
		BEFORE_APPLY: 'guidance-pages/before-apply'
	},
	MESSAGES: {
		COOKIES_UPDATED_SUCCESSFULLY: 'messages/cookies-updated-successfully'
	},
	REGISTER: {
		START: 'register/start',
		REGISTRATION_PERIOD_CLOSED: 'register/registration-period-closed',
		TYPE_OF_PARTY: 'register/who-registering-for',
		MYSELF: {
			FULL_NAME: 'register/myself/full-name',
			OVER_18: 'register/myself/are-you-18-over',
			ADDRESS: 'register/myself/address',
			EMAIL_ADDRESS: 'register/myself/email-address',
			TELEPHONE: 'register/myself/telephone',
			TELL_US_ABOUT_PROJECT: 'register/myself/tell-us-about-project',
			CHECK_YOUR_ANSWERS: 'register/myself/check-answers',
			DECLARATION: 'register/myself/declaration',
			REGISTRATION_SAVED: 'register/myself/registration-saved',
			REGISTRATION_COMPLETE: 'register/myself/registration-complete'
		},
		ORGANISATION: {
			FULL_NAME: 'register/organisation/full-name',
			OVER_18: 'register/organisation/are-you-18-over',
			ORGANISATION_NAME: 'register/organisation/name-of-organisation-or-charity',
			ROLE: 'register/organisation/what-job-title-or-role',
			ADDRESS: 'register/organisation/address',
			EMAIL: 'register/organisation/email-address',
			TELEPHONE: 'register/organisation/telephone-number',
			TELL_US_ABOUT_PROJECT: 'register/organisation/tell-us-about-project',
			CHECK_YOUR_ANSWERS: 'register/organisation/check-answers',
			DECLARATION: 'register/organisation/declaration',
			REGISTRATION_SAVED: 'register/organisation/registration-saved',
			CONFIRMATION: 'register/organisation/registration-complete'
		},
		AGENT: {
			REPRESENTING_FOR: 'register/agent/who-representing',
			REPRESENTEE_NAME: 'register/agent/name-person-representing',
			REPRESENTEE_NAME_FAMILY: 'register/agent/name-family-group-representing',
			REPRESENTEE_NAME_ORGANISATION: 'register/agent/name-organisation-representing',
			REPRESENTEE_OVER_18: 'register/agent/are-they-18-over',
			REPRESENTEE_ADDRESS: 'register/agent/their-postal-address',
			REPRESENTEE_EMAIL: 'register/agent/their-email-address',
			REPRESENTEE_TELEPHONE: 'register/agent/their-telephone-number',
			FULL_NAME: 'register/agent/full-name',
			ADDRESS: 'register/agent/address',
			EMAIL: 'register/agent/email-address',
			TELEPHONE: 'register/agent/telephone-number',
			ORGANISATION_NAME: 'register/agent/name-of-organisation',
			TELL_US_ABOUT_PROJECT: 'register/agent/tell-us-about-project',
			CHECK_YOUR_ANSWERS: 'register/agent/check-answers',
			DECLARATION: 'register/agent/declaration',
			REGISTRATION_SAVED: 'register/agent/registration-saved',
			REGISTRATION_COMPLETE: 'register/agent/registration-complete'
		},
		CONFIRM_EMAIL: 'register/confirm-email',
		TOKEN_EMAIL_NOT_VERIFIED: 'register/could-not-verify-email',
		MISSED_DEADLINE: 'register/missed-the-deadline'
	},
	INTERESTED_PARTY_GUIDE: {
		INTERESTED_PARTY: 'having-your-say-guide/interested-party',
		HAVE_SAY_PRE_APPLICATION: 'having-your-say-guide/taking-part-pre-application',
		REGISTER_TO_HAVE_YOUR_SAY: 'having-your-say-guide/registering-have-your-say',
		GET_INVOLVED_PRELIMINARY_MEETING: 'having-your-say-guide/get-involved-preliminary-meeting',
		HAVE_SAY_DURING_PROJECT_EXAMINATION: 'having-your-say-guide/have-your-say-examination',
		AFTER_MAKING_THE_DECISION: 'having-your-say-guide/what-happens-after-decision'
	},
	DCO_PROCESS_GUIDE: {
		DECISION_MAKINH_PROCESS_GUIDE: 'decision-making-process-guide/decision-making-process-guide',
		PRE_APPLICATION: 'decision-making-process-guide/pre-application',
		EXAMINATION_OF_THE_APPLICATION: 'decision-making-process-guide/examination-of-the-application',
		REVIEW_OF_THE_APPLICATION: 'decision-making-process-guide/review-of-the-application',
		PRE_EXAMINATION: 'decision-making-process-guide/pre-examination',
		RECOMMENDATION_AND_DECISION: 'decision-making-process-guide/recommendation-and-decision',
		WHAT_HAPPENS_AFTER_THE_DECISION_IS_MADE:
			'decision-making-process-guide/what-happens-after-the-decision-is-made'
	},
	FOOTER_PAGES: {
		ACCESSIBILITY: 'footer-pages/accessibility-statement',
		COOKIES: 'footer-pages/cookies-info'
	}
};

module.exports = {
	VIEW
};
