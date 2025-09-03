const updateLangQuery = (urlString, newLang) => {
	if (!urlString) return urlString;

	const [base, queryString] = urlString.split('?');
	if (!queryString) return `${base}?lang=${newLang}`;

	const paramsObject = queryString.split('&').reduce((paramsObject, paramPair) => {
		const [paramKey, paramValue] = paramPair.split('=');
		paramsObject[paramKey] = paramValue;
		return paramsObject;
	}, {});

	paramsObject.lang = newLang;

	const updatedQuery = Object.entries(paramsObject)
		.map(([paramKey, paramValue]) => `${paramKey}=${paramValue}`)
		.join('&');

	return `${base}?${updatedQuery}`;
};

module.exports = { updateLangQuery };
