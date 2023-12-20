const { getPrimaryNavigationLinks } = require('../_utils/get-links/get-primary-navigation-links');

const addGlobalsMiddleware = (req, res, next) => {
	const { url } = req;
	const { locals } = res;

	locals.globals = {
		primaryNavigationLinks: getPrimaryNavigationLinks(url)
	};

	next();
};

module.exports = { addGlobalsMiddleware };
