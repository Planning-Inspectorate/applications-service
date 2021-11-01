const httpPort = Number(process.env.PORT || 3000);

module.exports = {
  serviceName: 'Register to have your say',
  application: {
    defaultDisplayDateFormat: 'DD MMMM YYYY',
  },
  applications: {
    startingPoint: '/before-you-apply',
    timeout: Number(process.env.APPLICATIONS_SERVICE_API_TIMEOUT || 10000),
    url: process.env.APPLICATIONS_SERVICE_API_URL,
  },
  db: {},
  isProduction: process.env.NODE_ENV === 'production',
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    redact: ['opts.body', 'config.db.session.uri', 'config.server.sessionSecret'],
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
  },
  featureFlag: {
    googleTagManager: process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true',
  },
};
