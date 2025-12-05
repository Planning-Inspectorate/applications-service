/**
 * Config
 *
 * This is the single-source-of-truth for the application. All
 * config should be driven by environment variables where different
 * values are required.
 */

const path = require('path');
const { parseCSV } = require('../utils/parse');

module.exports = {
	gitSha: process.env.GIT_SHA ?? 'NO GIT SHA FOUND',
	backOfficeIntegration: {
		caseReferences: parseCSV(process.env.BACK_OFFICE_API_INTEGRATION_CASE_REFERENCES),
		getAllApplications: process.env.BACK_OFFICE_INTEGRATION_GET_APPLICATIONS,
		serviceBus: {
			enabled: process.env.BACK_OFFICE_SERVICE_BUS_ENABLED === 'true',
			hostname: process.env.BACK_OFFICE_SERVICE_BUS_HOSTNAME,
			topics: {
				REGISTER_NSIP_SUBSCRIPTION: 'register-nsip-subscription',
				DEADLINE_SUBMISSION: 'deadline-submission-topic',
				REGISTER_REPRESENTATION: 'register-representation'
			}
		},
		blobStorage: {
			deadlineSubmissions: {
				url: process.env.BACK_OFFICE_BLOB_STORAGE_DEADLINE_SUBMISSION_URL,
				container: process.env.BACK_OFFICE_BLOB_STORAGE_DEADLINE_SUBMISSION_CONTAINER
			},
			docsURL: process.env.AZURE_BLOB_STORE_HOST
		}
	},
	db: {},
	docs: {
		api: {
			path: process.env.DOCS_API_PATH || path.join(__dirname, '..', '..', 'api')
		}
	},
	logger: {
		level: process.env.LOGGER_LEVEL || 'info',
		redact: ['config.services.notify.apiKey']
	},
	uploads: {
		path: process.env.FILE_UPLOADS_PATH || path.join(__dirname, '..', '..', '..', '..', 'uploads'),
		// 50MB + 1 byte to mitigate off-by-one error with express-fileupload - https://github.com/mscdex/busboy/issues/297
		fileSizeLimit: 52428801,
		allowedFileTypes: {
			pdf: 'application/pdf',
			doc: 'application/msword',
			docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			jpg: 'image/jpeg',
			jpeg: 'image/jpeg',
			png: 'image/png',
			tif: 'image/tiff',
			tiff: 'image/tiff',
			xls: 'application/vnd.ms-excel',
			xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		}
	},
	server: {
		port: Number(process.env.SERVER_PORT || 3000),
		showErrors: process.env.SERVER_SHOW_ERRORS === 'true',
		terminationGracePeriod: Number(
			(process.env.SERVER_TERMINATION_GRACE_PERIOD_SECONDS || 0) * 1000
		)
	},
	apps: {
		applications: {
			baseUrl: process.env.APP_APPLICATIONS_BASE_URL
		}
	},
	isProduction: process.env.NODE_ENV === 'production',
	itemsPerPage: Number(process.env.DOCUMENTS_PER_PAGE || 20),
	timetableItemsPerPage: 100,
	documentsHost:
		process.env.DOCUMENTS_HOST ||
		'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/',
	ni: {
		host: process.env.NI_API_HOST,
		oauth: {
			clientId: process.env.NI_OAUTH_CLIENT_ID,
			clientSecret: process.env.NI_OAUTH_CLIENT_SECRET,
			username: process.env.NI_OAUTH_USERNAME,
			password: process.env.NI_OAUTH_PASSWORD
		},
		verboseRequestLogging: process.env.NI_VERBOSE_REQUEST_LOGGING === 'true'
	},
	services: {
		notify: {
			baseUrl: process.env.SRV_NOTIFY_BASE_URL,
			serviceId: process.env.SRV_NOTIFY_SERVICE_ID,
			apiKey: process.env.SRV_NOTIFY_API_KEY,
			templates: {
				IPRegistrationConfirmationEmailToIP: {
					en: process.env.SRV_NOTIFY_IP_REGISTRATION_CONFIRMATION_EMAIL_TO_IP,
					cy: process.env.SRV_NOTIFY_IP_REGISTRATION_CONFIRMATION_EMAIL_TO_IP_WELSH
				},
				submissionCompleteEmail: {
					en: process.env.SRV_NOTIFY_SUBMISSION_COMPLETE_EMAIL,
					cy: process.env.SRV_NOTIFY_SUBMISSION_COMPLETE_EMAIL_WELSH
				},
				subscriptionCreateEmail: {
					en: process.env.SRV_NOTIFY_SUBSCRIPTION_CREATE_EMAIL,
					cy: process.env.SRV_NOTIFY_SUBSCRIPTION_CREATE_EMAIL_WELSH
				}
			},
			havingYourSayUrl: `${process.env.APPLICATIONS_WEB_BASE_URL}/having-your-say-guide`,
			subscriptionCreateDomain: process.env.APPLICATIONS_WEB_BASE_URL
		},
		encryption: {
			algorithm: 'aes-256-ctr',
			secretKey: process.env.ENCRYPTION_SECRET_KEY || 'dummy-key-set-before-the-testrun'
		}
	},
	featureFlag: {
		useApplicationInsights: process.env.FEATURE_APPLICATION_INSIGHTS === 'true',
		allowWelshCases: process.env.FEATURE_ALLOW_WELSH_CASES === 'true',
		enableProjectsMap: process.env.FEATURE_ENABLE_PROJECTS_MAP === 'true',
		displaySpecificAndGeneralAdvice: process.env.FEATURE_REGISTER_OF_ADVICE === 'true'
	}
};
