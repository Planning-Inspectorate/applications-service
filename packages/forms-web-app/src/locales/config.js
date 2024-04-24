const locales = {
	en: {
		code: 'en',
		name: 'English'
	},
	cy: {
		code: 'cy',
		name: 'Cymraeg'
	}
};

const defaultLocale = locales.en;

const localesQueryCookieID = 'lang';

const localesQueryStringID = 'lang';

module.exports = { locales, defaultLocale, localesQueryCookieID, localesQueryStringID };
