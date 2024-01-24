const { getPrimaryNavigationLinks } = require('../_utils/get-links/get-primary-navigation-links');

const addGlobalsMiddleware = (req, res, next) => {
	const { url } = req;
	const { locals } = res;
	const { i18n } = locals;

	locals.globals = {
		primaryNavigationLinks: getPrimaryNavigationLinks(i18n, url)
	};
	
	next();
};

module.exports = { addGlobalsMiddleware };
