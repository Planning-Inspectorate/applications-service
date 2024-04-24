const {
	locales,
	defaultLocale,
	localesQueryCookieID,
	localesQueryStringID
} = require('../../../locales/config');
const { buildQueryString } = require('../build-query-string');

const buildLocaleSelectorLinkURL = (path, query, code) => {
	const queryString = buildQueryString({ ...query, [localesQueryStringID]: code });

	return path + queryString;
};

const getLocaleSelectorLinks = (cookies, path, query) => {
	const activeLocale =
		query[localesQueryStringID] || cookies[localesQueryCookieID] || defaultLocale.code;

	return Object.keys(locales).map((locale) => {
		const { code, name } = locales[locale];
		return {
			active: code === activeLocale,
			name,
			url: buildLocaleSelectorLinkURL(path, query, code)
		};
	});
};

module.exports = { getLocaleSelectorLinks };
