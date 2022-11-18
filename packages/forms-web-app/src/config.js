const httpPort = Number(process.env.PORT || 3000);

module.exports = {
	application: {
		defaultDisplayDateFormat: 'DD MMMM YYYY'
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
	db: {
		session: {
			redisUrl: process.env.REDIS_URL || 'redis://redis:6379'
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
		// https://expressjs.com/en/5x/api.html#app.set - to account for .gov.uk
		subdomainOffset: parseInt(process.env.SUBDOMAIN_OFFSET, 10) || 3,
		useSecureSessionCookie: process.env.USE_SECURE_SESSION_COOKIES === 'true',
		googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
		googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
		nsipBaseUrl: process.env.NSIP_BASE_URL || 'https://infrastructure.planninginspectorate.gov.uk' // Used for project links and email subscription
	},
	featureFlag: {
		googleTagManager: process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true',
		usePrivateBetaV1RoutesOnly: process.env.PRIVATE_BETA_V1_ROUTES_ONLY === 'true',
		useRedisSessionStore: process.env.FEATURE_REDIS_SESSION_STORE === 'true',
		allowSaveAndExitOption: process.env.FEATURE_SAVE_AND_EXIT_OPTION === 'true',
		showAffectedAreaSection: process.env.FEATURE_SHOW_AFFECTED_AREA_SECTION === 'true',
		hideProjectTimelineLink: process.env.FEATURE_PROJECT_TIMELINE_LINK === 'true',
		allowDocumentLibrary: process.env.FEATURE_ALLOW_DOCUMENT_LIBRARY === 'true',
		allowRepresentation: process.env.FEATURE_ALLOW_REPRESENTATION === 'true'
	},
	featureHideLink: {
		hideAllExaminationDocumentsLink: true,
		hideDecisionMakingProcessGuideLink: true,
		hideExaminationTimetableLink: true,
		hideProjectInformationLink: true,
		hideRecommendationAndDecisionLink: true
	},
	serviceFeedbackUrl:
		'https://forms.office.com/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUMTNIVDdHTTdWRFU5MlRQRFczNzdPNDRHQS4u',
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
	}
};
