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
const { Status: projectStageNames } = require('./utils/status');
const fileSizeDisplayHelper = require('./lib/file-size-display-helper');
const fileTypeDisplayHelper = require('./lib/file-type-display-helper');
const filterByKey = require('./lib/filter-by-key');
const addKeyValuePair = require('./lib/add-key-value-pair');
const renderTemplateFilter = require('./lib/render-template-filter');
const flashMessageCleanupMiddleware = require('./middleware/flash-message-cleanup');
const flashMessageToNunjucks = require('./middleware/flash-message-to-nunjucks');
const removeUnwantedCookiesMiddelware = require('./middleware/remove-unwanted-cookies');
const fileUpload = require('express-fileupload');

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

const accessibleAutocompleteRoot = path.resolve(
	require.resolve('accessible-autocomplete'),
	'../..'
);
const govukFrontendRoot = path.resolve(require.resolve('govuk-frontend'), '../..');
const mojFrontendRoot = path.resolve(require.resolve('@ministryofjustice/frontend'), '../..');
const pinsComponentsRoot = path.resolve(
	require.resolve('@planning-inspectorate/pins-components'),
	'../..'
);

const viewPaths = [
	govukFrontendRoot,
	mojFrontendRoot,
	path.join(__dirname, 'views'),
	pinsComponentsRoot
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

env.addFilter('addKeyValuePair', addKeyValuePair);
env.addFilter('formatBytes', fileSizeDisplayHelper);
env.addFilter('formatMimeType', fileTypeDisplayHelper);
env.addFilter('filterByKey', filterByKey);
env.addGlobal('featureFlag', config.featureFlag);
env.addGlobal('googleAnalyticsId', config.server.googleAnalyticsId);
env.addGlobal('googleTagManagerId', config.server.googleTagManagerId);
env.addGlobal('host', config.server.host);
env.addGlobal('nsipBaseUrl', config.server.nsipBaseUrl);
env.addGlobal('projectStageNames', projectStageNames);
env.addFilter('render', renderTemplateFilter(nunjucks));

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
app.use(express.urlencoded(config.applications.urlencoded));
app.use(fileUpload());
app.use(cookieParser());
app.use(session(sessionStoreConfig));
app.use(flashMessageCleanupMiddleware);
app.use(flashMessageToNunjucks(env));
app.use(removeUnwantedCookiesMiddelware);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
	'/assets',
	express.static(path.join(accessibleAutocompleteRoot, 'dist')),
	express.static(path.join(govukFrontendRoot, 'govuk', 'assets'))
);
app.use('/assets/govuk/all.js', express.static(path.join(govukFrontendRoot, 'govuk', 'all.js')));

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
		res.status(404).render('error/not-found');
		next();
	})
	.use((err, req, res, next) => {
		logger.error({ err }, 'Unhandled exception');

		res.status(500).render('error/unhandled-exception');
		next();
	});

module.exports = app;
