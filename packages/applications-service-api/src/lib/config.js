/**
 * Config
 *
 * This is the single-source-of-truth for the application. All
 * config should be driven by environment variables where different
 * values are required.
 */

const path = require('path');

module.exports = {
  db: {},
  docs: {
    api: {
      path: process.env.DOCS_API_PATH || path.join(__dirname, '..', '..', 'api'),
    },
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    redact: ['config.services.notify.apiKey'],
  },
  server: {
    port: Number(process.env.SERVER_PORT || 3000),
    showErrors: process.env.SERVER_SHOW_ERRORS === 'true',
    terminationGracePeriod: Number(
      (process.env.SERVER_TERMINATION_GRACE_PERIOD_SECONDS || 0) * 1000
    ),
  },
  apps: {
    applications: {
      baseUrl: process.env.APP_APPLICATIONS_BASE_URL,
    },
  },
  trialistPath:
    process.env.TRIALIST_DATA_PATH || path.join(__dirname, '..', '..', 'data', 'trialists.json'),
  itemsPerPage: Number(process.env.DOCUMENTS_PER_PAGE || 20),
  documentsHost:
    process.env.DOCUMENTS_HOST ||
    'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/',
  services: {
    notify: {
      baseUrl: process.env.SRV_NOTIFY_BASE_URL,
      serviceId: process.env.SRV_NOTIFY_SERVICE_ID,
      apiKey: process.env.SRV_NOTIFY_API_KEY,
      templates: {
        IPRegistrationConfirmationEmailToIP:
          process.env.SRV_NOTIFY_IP_REGISTRATION_CONFIRMATION_EMAIL_TO_IP,
        MagicLinkEmail: process.env.SRV_NOTIFY_MAGIC_LINK_EMAIL,
      },
      preliminaryMeetingUrl:
        process.env.PRELIMINARY_MEETING_URL ||
        'https://applications-service-web-app.azurewebsites.net/',
      havingYourSayUrl:
        process.env.HAVING_YOUR_SAY_URL ||
        'https://applications-service-web-app.azurewebsites.net/',
      magicLinkDomain:
        process.env.MAGIC_LINK_DOMAIN || 'https://applications-service-web-app.azurewebsites.net/',
    },
    encryption: {
      algorithm: 'aes-256-ctr',
      secretKey: process.env.ENCRYPTION_SECRET_KEY || 'x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+K',
    },
  },
};
