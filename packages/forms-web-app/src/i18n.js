const i18next = require('i18next');
const i18nMiddleware = require('i18next-http-middleware');
// const Backend = require('i18next-fs-backend');
const fs = require('fs');

const languages = ['en', 'cy'];

const options = {
	order: ['session'],
	lookupSession: 'lang',
	caches: false
};

function setLangauageWithSession(req, res, next) {
	req.i18n.changeLanguage(req.session.lang);
	next();
}

const readAllFolder = (dirMain) => fs.readdirSync(dirMain);

function createResourcesFromPages() {
	const allPages = readAllFolder(`${__dirname}/pages`);
	const allLocales = readAllFolder(`${__dirname}/locales`);

	console.log('Locales: ', allLocales);
	const resources = {
		en: {
			translation: {}
		},
		cy: {
			translation: {}
		}
	};
	allPages.forEach((page) => {
		languages.forEach((lang) => {
			try {
				resources[lang].translation[
					page
				] = require(`./pages/${page}/locales/${lang}/translation.json`);
			} catch (e) {
				console.error(`Error - ${page} is missing a translation for ${lang}`);
			}
		});
	});

	allLocales.forEach((page) => {
		languages.forEach((lang) => {
			try {
				resources[lang].translation[page] = require(`./locales/${page}/${lang}/translation.json`);
			} catch (e) {
				console.error(`Error - ${page} is missing a translation for ${lang}`);
			}
		});
	});

	console.log('Resoucres: ', resources);

	return resources;
}

function configureI18n(app) {
	const resources = createResourcesFromPages();
	i18next
		// .use(Backend)
		.use(i18nMiddleware.LanguageDetector)
		.init(
			{
				detection: options,
				preload: languages,
				fallbackLng: 'en',
				debug: app.get('env') === 'development',
				ns: ['translation'],
				defaultNS: 'translation',
				resources
			},
			(err) => {
				if (err) return console.error(err);
			}
		);

	app.use([i18nMiddleware.handle(i18next, {}), setLangauageWithSession]);

	app.use('/lang', (req, res) => {
		req.session.lang = req.query.lang;
		return res.redirect(req.get('Referrer'));
	});
}

module.exports = {
	configureI18n
};
