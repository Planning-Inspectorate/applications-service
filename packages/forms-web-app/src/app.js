const express = require('express');
const compression = require('compression');
const lusca = require('lusca');
const path = require('path');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const dateFilter = require('nunjucks-date-filter');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');
const pinoExpress = require('express-pino-logger');
const uuid = require('uuid');
const { prometheus } = require('@pins/common');
const sessionConfig = require('./lib/session');
const fileSizeDisplayHelper = require('./lib/file-size-display-helper');
const fileTypeDisplayHelper = require('./lib/file-type-display-helper');
const filterByKey = require('./lib/filter-by-key');
const addKeyValuePair = require('./lib/add-key-value-pair');
const renderTemplateFilter = require('./lib/render-template-filter');
const flashMessageCleanupMiddleware = require('./middleware/flash-message-cleanup');
const flashMessageToNunjucks = require('./middleware/flash-message-to-nunjucks');
const removeUnwantedCookiesMiddelware = require('./middleware/remove-unwanted-cookies');
const { status: projectStageNames } = require('./utils/status');
const { VIEW } = require('./lib/views');

require('express-async-errors');

const config = require('./config');
const logger = require('./lib/logger');
const routes = require('./routes');

const app = express();

prometheus.init(app);

app.use(
	pinoExpress({
		logger,
		genReqId: () => uuid.v4()
	})
);

const isDev = app.get('env') === 'development';

const nunjucksConfig = {
	autoescape: true,
	noCache: true,
	watch: isDev,
	express: app
};

const viewPaths = [
	path.join(__dirname, '..', 'node_modules', 'govuk-frontend'),
	path.join(__dirname, '..', 'node_modules', '@ministryofjustice', 'frontend'),
	path.join(__dirname, 'views'),
	path.join(__dirname, '..', 'node_modules', '@planning-inspectorate', 'pins-components')
];

const env = nunjucks.configure(viewPaths, nunjucksConfig);

dateFilter.setDefaultFormat(config.application.defaultDisplayDateFormat);
env.addFilter('date', dateFilter);

env.addFilter('getkeys', function (object) {
	return Object.keys(object);
});

env.addFilter('tostring', function (object) {
	return JSON.stringify(object);
});

env.addFilter('docname', function (object) {
	return (
		object &&
		object
			.replace('https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/', '')
			.split('/')[1]
			.split('.pdf')[0]
	);
});

env.addFilter('formatBytes', fileSizeDisplayHelper);
env.addFilter('formatMimeType', fileTypeDisplayHelper);
env.addFilter('filterByKey', filterByKey);
env.addFilter('addKeyValuePair', addKeyValuePair);
env.addFilter('render', renderTemplateFilter(nunjucks));

env.addGlobal('featureFlag', config.featureFlag);
env.addGlobal('googleAnalyticsId', config.server.googleAnalyticsId);
env.addGlobal('googleTagManagerId', config.server.googleTagManagerId);
env.addGlobal('host', config.server.host);
env.addGlobal('nsipBaseUrl', config.server.nsipBaseUrl);
env.addGlobal('projectStageNames', projectStageNames);

if (config.server.useSecureSessionCookie) {
	app.set('trust proxy', 1); // trust first proxy
}

let sessionStoreConfig = sessionConfig();

if (config.featureFlag.useRedisSessionStore) {
	const redisClient = createClient({ url: config.db.session.redisUrl });
	redisClient.on('error', function (err) {
		logger.error(`Could not establish a connection with redis. ${err}`);
	});
	redisClient.on('connect', () => {
		logger.info('Connected to redis successfully');
	});

	sessionStoreConfig = { ...sessionStoreConfig, store: new RedisStore({ client: redisClient }) };
}
app.use(compression());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionStoreConfig));
app.use(flashMessageCleanupMiddleware);
app.use(flashMessageToNunjucks(env));
app.use(removeUnwantedCookiesMiddelware);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
	'/assets',
	express.static(path.join(__dirname, '..', 'node_modules', 'accessible-autocomplete', 'dist')),
	express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets'))
);
app.use(
	'/assets/govuk/all.js',
	express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'all.js'))
);

function isProjectClosed(req, res, next) {
	const { isPeriodOpen } = req.session;

	if (
		typeof isPeriodOpen !== 'undefined' &&
		isPeriodOpen === false &&
		req.url.includes('register/')
	) {
		res.redirect('/register-have-your-say/registration-period-closed');
	} else {
		next();
	}
}
app.use(isProjectClosed);
// Routes
app.use('/', routes);

// View Engine
app.set('view engine', 'njk');

// For working with req.subdomains, primarily for cookie control.
app.set('subdomain offset', config.server.subdomainOffset);

// Error handling
app
	.use((req, res, next) => {
		res.status(404).render(VIEW.ERROR[404]);
		next();
	})
	.use((err, req, res, next) => {
		logger.error({ err }, 'Unhandled exception');

		res.status(500).render(VIEW.ERROR[500]);
		next();
	});

module.exports = app;
