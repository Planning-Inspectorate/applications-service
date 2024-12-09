require('dotenv').config();

const { parseRedisConnectionString } = require('@pins/common/src/utils/redis');

const httpPort = Number(process.env.PORT || 3000);
const splitStringToArray = (str) => str?.split(',').map((s) => s.trim()) || [];

module.exports = {
	gitSha: process.env.GIT_SHA ?? 'NO GIT SHA FOUND',
	application: {
		defaultDisplayDateFormat: 'D MMMM YYYY'
	},
	applications: {
		timeout: Number(process.env.APPLICATIONS_SERVICE_API_TIMEOUT || 10000),
		url: process.env.APPLICATIONS_SERVICE_API_URL || 'http://applications-service-api:3000',
		noOfCommentsAllowed: 16,
		maxCharacters: 65234,
		urlencoded: {
			extended: false,
			limit: '500kb'
		}
	},
	cacheControl: {
		maxAge: process.env.CACHE_CONTROL_MAX_AGE || '1d'
	},
	db: {
		session: {
			redis: parseRedisConnectionString(process.env.REDIS_CONNECTION_STRING)
		}
	},
	defaultPageTitle: 'The Planning Inspectorate',
	isProduction: process.env.NODE_ENV === 'production',
	logger: {
		level: process.env.LOGGER_LEVEL || 'info',
		redact: ['opts.body', 'config.db.session.uri', 'config.server.sessionSecret']
	},
	server: {
		host: process.env.HOST_URL || `http://localhost:${httpPort}`, // This is used for the HTML generator
		port: httpPort,
		sessionSecret: process.env.SESSION_KEY,
		sessionLengthInHours: 4,
		// https://expressjs.com/en/5x/api.html#app.set - to account for .gov.uk
		subdomainOffset: parseInt(process.env.SUBDOMAIN_OFFSET, 10) || 3,
		useSecureSessionCookie: process.env.USE_SECURE_SESSION_COOKIES === 'true',
		googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
		googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
		nsipBaseUrl: process.env.NSIP_BASE_URL || 'https://infrastructure.planninginspectorate.gov.uk' // Used for project links and email subscription
	},
	featureFlag: {
		allowHomepage: process.env.FEATURE_HOME_PAGE === 'true',
		allowPrimaryNavigation: process.env.FEATURE_PRIMARY_NAVIGATION === 'true',
		googleTagManager: process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true',
		useRedisSessionStore: process.env.FEATURE_REDIS_SESSION_STORE === 'true',
		allowSaveAndExitOption: process.env.FEATURE_SAVE_AND_EXIT_OPTION === 'true',
		showAffectedAreaSection: process.env.FEATURE_SHOW_AFFECTED_AREA_SECTION === 'true',
		contentSecurityPolicy: process.env.FEATURE_ENABLED_CONTENT_SECURITY_POLICY === 'true',
		allowProjectInformation: process.env.FEATURE_PROJECT_INFORMATION === 'true',
		useGeneralS51BackOffice: process.env.FEATURE_GENERAL_S51_BO === 'true',
		generalisedFormSanitisation:
			process.env.FEATURE_ENABLE_GENERALISED_FORM_SANITISATION === 'true',
		useApplicationInsights: process.env.FEATURE_APPLICATION_INSIGHTS === 'true',
		openRegistrationCaseReferences: splitStringToArray(
			process.env.OPEN_REGISTRATION_CASE_REFERENCES
		),
		allowApplicationsPagination: process.env.BACK_OFFICE_INTEGRATION_GET_APPLICATIONS !== 'MERGE',
		allowWelshTranslation: process.env.FEATURE_ALLOW_WELSH_TRANSLATION === 'true'
	},
	serviceFeedbackUrl:
		'https://forms.office.com/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUMTNIVDdHTTdWRFU5MlRQRFczNzdPNDRHQS4u',
	pinsContactDetails: {
		enquiriesEmailAddress: 'NIEnquiries@planninginspectorate.gov.uk',
		supportTeamPhoneNumber: '0303 444 5000',
		pressAndMediaPhoneNumber: '0303 444 5004',
		pressAndMediaEmailAddress: 'press.office@planninginspectorate.gov.uk',
		contactUsFormURL: 'https://contact-us.planninginspectorate.gov.uk/hc/en-gb/requests/new'
	},
	pinsSocialMedia: {
		twitterHandle: '@PINSgov',
		twitterURL: 'https://www.twitter.com/PINSgov'
	},
	pinsURL: {
		index: 'https://infrastructure.planninginspectorate.gov.uk',
		indexCY: 'https://infrastructure.planninginspectorate.gov.uk/cy/',
		advicePages:
			'https://www.gov.uk/government/collections/national-infrastructure-planning-advice-notes'
	},
	govUK: {
		accessibleDocumentsPolicy:
			'https://www.gov.uk/search/all?keywords=accessible%20document%20policy',
		advicePages:
			'https://www.gov.uk/government/collections/national-infrastructure-planning-advice-notes',
		administrativeCourtURL: 'https://www.gov.uk/courts-tribunals/administrative-court',
		crownCopyright:
			'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
		customerPrivacyNotice:
			'https://www.gov.uk/government/publications/planning-inspectorate-privacy-notices/customer-privacy-notice',
		complaintsProcedure:
			'https://www.gov.uk/government/organisations/planning-inspectorate/about/complaints-procedure',
		freedomOfInformation: 'https://www.gov.uk/make-a-freedom-of-information-request',
		furtherInformationURL: 'https://www.gov.uk/government/organisations/planning-inspectorate',
		dataProtection: 'https://www.gov.uk/data-protection',
		developmentConsent:
			'https://www.gov.uk/government/collections/nationally-significant-infrastructure-projects-development-consent',
		developmentConsentWelsh:
			'https://www.gov.uk/government/collections/prosiectau-seilwaith-o-arwyddocad-cenedlaethol-caniatad-datblygu.cy',
		developmentConsentAndAdvice:
			'https://www.gov.uk/guidance/nationally-significant-infrastructure-projects-development-consent-legislation',
		developmentConsentAndAdviceWelsh:
			'https://www.gov.uk/guidance/nationally-significant-infrastructure-projects-development-consent-legislation.cy',
		preApplicationProspectus:
			'https://www.gov.uk/guidance/nationally-significant-infrastructure-projects-2024-pre-application-prospectus',
		nationalPolicyStatements:
			'https://www.gov.uk/guidance/nationally-significant-infrastructure-projects-national-policy-statements',
		nationalPolicyStatementsWelsh:
			'https://www.gov.uk/guidance/nationally-significant-infrastructure-projects-national-policy-statements.cy',
		OGL: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/1/open-government-licence.htm',
		planningGuidance:
			'https://www.gov.uk/government/collections/national-infrastructure-planning-guidance',
		publicSectorAccessibilityRegulationsURL:
			'https://www.legislation.gov.uk/uksi/2018/952/regulation/4/made',
		nsipNews:
			'https://www.gov.uk/search/news-and-communications?parent=planning-inspectorate&organisations%5B%5D=planning-inspectorate&order=updated-newest'
	},
	externalURL: {
		abilityNetURL: 'https://mcmw.abilitynet.org.uk/',
		wcag21URL: 'https://www.w3.org/TR/WCAG21/',
		eassURL: 'https://www.equalityadvisoryservice.com/'
	},
	pinsPrivacyNoticeUrl:
		'https://www.gov.uk/government/publications/planning-inspectorate-privacy-notices/customer-privacy-notice',
	plannedServiceOutage: {
		showOutagePage: process.env.ACTIVATE_PLANNED_OUTAGE === 'true',
		outageResumeText: process.env.PLANNED_OUTAGE_RESUME_TEXT
	},
	sessionStorage: {
		examination: {
			name: 'examination',
			property: {
				applicant: 'isApplicant',
				caseRef: 'caseRef',
				currentView: 'currentView',
				deadlineItems: 'deadlineItems',
				description: 'description',
				email: 'email',
				hasInterestedPartyNo: 'hasInterestedPartyNo',
				comment: 'comment',
				id: 'id',
				interestedPartyNumber: 'interestedPartyNumber',
				selectedDeadlineItems: 'selectedDeadlineItems',
				name: 'name',
				submittingFor: 'submittingFor',
				title: 'title',
				file: 'file'
			}
		}
	},
	fileUpload: {
		amountOfFileslimit: process.env.MAX_NUMBER_OF_UPLOAD_FILES || 20,
		maxFileSizeInMb: process.env.MAX_SIZE_OF_SINLGE_UPLOAD_FILE || 50,
		expressFileUpload: {
			tempFileDir: `../../../uploads`,
			abortOnLimit: true
		}
	},
	maps: {
		osMapsApiKey: process.env.OS_MAPS_API_KEY,
		osMapsApiSecret: process.env.OS_MAPS_API_SECRET
	}
};
