const { getHeaderTitle } = require('../_utils/get-content/get-header-title');
const { getFooterLinks } = require('../_utils/get-links');
const { getLocaleSelectorLinks } = require('../_utils/get-links/get-locale-selector-links');
const { getPrimaryNavigationLinks } = require('../_utils/get-links/get-primary-navigation-links');

const addGlobalMiddleware = (req, res, next) => {
	const { cookies, i18n, path, query } = req;
	const { locals } = res;

	locals.global = {
		headerTitle: getHeaderTitle(path, i18n),
		footerLinks: getFooterLinks(i18n),
		localeSelectorLinks: getLocaleSelectorLinks(cookies, path, query),
		primaryNavigationLinks: getPrimaryNavigationLinks(path, i18n)
	};

	next();
};

module.exports = { addGlobalMiddleware };
