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

	const result = {};
	for (const locale in locales) {
		const langCode = locales[locale].code;

		result[locale] = {
			active: langCode === activeLocale,
			name: locales[langCode].name,
			url: buildLocaleSelectorLinkURL(path, query, langCode)
		};
	}

	return result;
};

module.exports = { getLocaleSelectorLinks };
