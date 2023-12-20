const { VIEW } = require('../../../src/lib/views');

describe('lib/views', () => {
	it('should have the expected defined constants', () => {
		expect(VIEW).toEqual({
			APPLICATION_NUMBER: 'application-number',
			PROJECTS: {
				PROJECT: 'projects/index',
				PROJECT_TIMELINE: 'projects/project-timeline',
				DOCUMENTS: 'projects/documents',
				REPRESENTATION: 'projects/representation',
				REPRESENTATIONS: 'projects/representations',
				TIMETABLE: 'projects/examination-timetable',
				ALL_EXAMINATION_DOCUMENTS: 'projects/all-examination-documents',
				RECOMMENDATIONS: 'projects/recommendations'
			},
			PROJECT_SEARCH: 'project-search',
			GUIDANCE_PAGES: {
				BEFORE_APPLY: 'guidance-pages/before-apply'
			},
			REGISTER: {
				COMMON: {
					FULL_NAME_VIEW: 'register/common/full-name',
					ADDRESS_VIEW: 'register/common/address',
					EMAIL_ADDRESS_VIEW: 'register/common/email-address',
					ARE_YOU_OVER_18: 'register/common/are-you-18-over',
					TELEPHONE_NUMBER_VIEW: 'register/common/telephone',
					DECLARATION: 'register/common/declaration',
					REGISTRATION_COMPLETE: 'register/common/registration-complete',
					REGISTRATION_SAVED: 'register/common/registration-saved'
				},
				START: 'register/start',
				TYPE_OF_PARTY: 'register/who-registering-for',
				MISSED_DEADLINE: 'register/missed-the-deadline',
				MYSELF: {
					FULL_NAME: 'register/myself/full-name',
					OVER_18: 'register/myself/are-you-18-over',
					ADDRESS: 'register/myself/address',
					EMAIL_ADDRESS: 'register/myself/email-address',
					TELEPHONE: 'register/myself/telephone-number',
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
					REGISTRATION_COMPLETE: 'register/organisation/registration-complete'
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
				}
			},
			FOOTER_PAGES: {
				COOKIES: 'footer-pages/cookies-info'
			},
			EXAMINATION: {
				HAVE_YOUR_SAY_DURING_EXAMINATION: 'have-your-say',
				ROUTE_PREFIX: 'pages/examination/',
				WHO_ARE_YOU_SUBMITTING_FOR: 'who-are-you-submitting-for',
				YOUR_EMAIL_ADDRESS: 'your-email-address',
				YOUR_NAME: 'name'
			}
		});
	});
});
