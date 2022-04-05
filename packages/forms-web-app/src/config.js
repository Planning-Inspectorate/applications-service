const httpPort = Number(process.env.PORT || 3000);

module.exports = {
  serviceName: 'Register to have your say',
  application: {
    defaultDisplayDateFormat: 'DD MMMM YYYY',
  },
  applications: {
    timeout: Number(process.env.APPLICATIONS_SERVICE_API_TIMEOUT || 10000),
    url: process.env.APPLICATIONS_SERVICE_API_URL,
    noOfCommentsAllowed: 16,
  },
  db: {
    session: {
      uri: process.env.SESSION_MONGODB_URL,
      databaseName: process.env.SESSION_MONGODB_DB_NAME,
      collection: process.env.SESSION_MONGODB_COLLECTION || 'sessions',
      expiresColumn: '_ts',
      expires: 1000 * 60 * 60 * 24 * 14, // value in milliseconds
      expiresAfterSeconds: 60 * 60 * 24 * 14, // value in seconds
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
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
    nsipBaseUrl: process.env.NSIP_BASE_URL || 'https://infrastructure.planninginspectorate.gov.uk', // Used for project links
  },
  featureFlag: {
    googleTagManager: process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true',
    usePrivateBetaV1RoutesOnly: process.env.PRIVATE_BETA_V1_ROUTES_ONLY === 'true',
  },
};
