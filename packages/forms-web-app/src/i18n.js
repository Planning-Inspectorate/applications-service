const path = require('path');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextBackend = require('i18next-fs-backend');
const {
	defaultLocale,
	locales,
	localesQueryCookieID,
	localesQueryStringID
} = require('./locales/config');
const {
	featureFlag: { allowWelshTranslation }
} = require('./config');
const { buildQueryString } = require('./pages/_utils/build-query-string');

const i18nRedirect = (req, res, next) => {
	const { cookies, path, method, query } = req;
	const localesQuery = query[localesQueryStringID];
	const localesCookie = cookies[localesQueryCookieID];

	if (
		method === 'GET' &&
		allowWelshTranslation &&
		!localesQuery &&
		localesCookie &&
		localesCookie !== defaultLocale.code
	) {
		const queryString = buildQueryString({ ...query, [localesQueryStringID]: localesCookie });

		return res.redirect(path + queryString);
	}

	next();
};

const getSupportedLngs = () => {
	const supportedLngs = [locales.en.code];

	if (allowWelshTranslation) supportedLngs.push(locales.cy.code);

	return supportedLngs;
};

const configureI18n = (app) => {
	i18next
		.use(i18nextMiddleware.LanguageDetector)
		.use(i18nextBackend)
		.init({
			preload: [defaultLocale.code],
			debug: false,
			lang: defaultLocale.code,
			fallbackLng: defaultLocale.code,
			ns: ['global'],
			detection: {
				caches: ['cookie'],
				lookupCookie: localesQueryCookieID,
				lookupQuerystring: localesQueryStringID,
				order: ['querystring', 'cookie']
			},
			load: 'currentOnly',
			partialBundledLanguages: true,
			resources: {},
			backend: {
				loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json')
			},
			supportedLngs: getSupportedLngs(),
			nsSeparator: '.'
		});

	app.use(i18nextMiddleware.handle(i18next));
};

module.exports = {
	i18nRedirect,
	configureI18n
};
