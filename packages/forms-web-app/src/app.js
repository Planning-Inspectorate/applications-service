const express = require('express');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pinoExpress = require('express-pino-logger');
const uuid = require('uuid');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware')
const i18nextBackend = require('i18next-fs-backend');
const { configureSessionStore } = require('./lib/session');
const flashMessageCleanupMiddleware = require('./middleware/flash-message-cleanup');
const flashMessageToNunjucks = require('./middleware/flash-message-to-nunjucks');
const removeUnwantedCookiesMiddelware = require('./middleware/remove-unwanted-cookies');
const formSanitisationMiddleware = require('./middleware/form-sanitisation');
const { plannedOutage } = require('./middleware/planned-outage');
const {
	setLocalslDisplayCookieBannerValue
} = require('./middleware/set-locals-display-cookie-banner-value');
const fileUpload = require('express-fileupload');

require('express-async-errors');

const config = require('./config');
const logger = require('./lib/logger');
const routes = require('./routes');
const { calcMaxFileSizeLimit } = require('./pages/examination/select-file/utils/helpers');
const { configureCSP } = require('./csp');
const { nunjucksConfigure } = require('./nunjucks-configure');
const { setHeaderTitle } = require('./middleware/get-header-title');

const app = express();

app.use(
	pinoExpress({
		logger,
		genReqId: () => uuid.v4()
	})
);

if (config.featureFlag.contentSecurityPolicy) configureCSP(app);

const govukFrontendRoot = path.resolve(require.resolve('govuk-frontend'), '../..');

const nunjucksEnv = nunjucksConfigure(app);

if (config.server.useSecureSessionCookie) {
	app.set('trust proxy', 1); // trust first proxy
}
console.log('loadPath:>>>', path.join(__dirname, 'public/locales/{{ns}}/{{lng}}.json'))
const sessionStoreConfig = configureSessionStore(session);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded(config.applications.urlencoded));
app.use(
	fileUpload({
		...config.fileUpload.expressFileUpload,
		limits: calcMaxFileSizeLimit()
	})
);
app.use(cookieParser());
app.use(session(sessionStoreConfig));
app.use(flashMessageCleanupMiddleware);
app.use(flashMessageToNunjucks(nunjucksEnv));
app.use(removeUnwantedCookiesMiddelware);
app.use(formSanitisationMiddleware());
app.use(setLocalslDisplayCookieBannerValue);
app.use(setHeaderTitle);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(govukFrontendRoot, 'govuk', 'assets')));
app.use('/assets/govuk/all.js', express.static(path.join(govukFrontendRoot, 'govuk', 'all.js')));
app.use('/sw.script.js', express.static(path.join(__dirname, 'public/scripts/sw.script.js')));


i18next	.use(i18nextMiddleware.LanguageDetector)
		.use(i18nextBackend)
		.init({
			preload: ['en'],
			debug: true,
			lang: 'en',
			fallbackLng: 'en',
			ns: ['common'],
			detection: {
				lookupQuerystring: 'lang',
				order: ['querystring', 'cookie'],
			},
			load: 'currentOnly',
			backend: {
				loadPath: path.join(__dirname, 'public/locales/{{lng}}/{{ns}}.json'),
			}
		})


app.use(i18nextMiddleware.handle(i18next))

// View Engine
app.set('view engine', 'njk');

if (config.plannedServiceOutage.showOutagePage) app.use(plannedOutage);

// Routes
app.use('/', routes);

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
