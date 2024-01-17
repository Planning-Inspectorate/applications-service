const { getPrimaryNavigationLinks } = require('../_utils/get-links/get-primary-navigation-links');

const addGlobalsMiddleware = (req, res, next) => {
	const { cookies, query, url } = req;
	const { locale } = query;
	const { locals } = res;

	console.log('query, url::: ', query, url);
	console.log('cookies::: ', cookies);
	// console.log('cookie::: ', cookie);

	// cookie('testYoyo', 'en');

	locals.globals = {
		primaryNavigationLinks: getPrimaryNavigationLinks(locale, url)
	};

	next();
};

module.exports = { addGlobalsMiddleware };
