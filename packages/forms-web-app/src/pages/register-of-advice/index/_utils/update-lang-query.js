const updateLangQuery = (urlString, newLang) => {
	if (!urlString) return urlString;
	const [base, queryString] = urlString.split('?');
	if (!queryString) return `${base}?lang=${newLang}`;
	const queryParams = queryString.split('&').reduce((acc, pair) => {
		const [key, value] = pair.split('=');
		acc[key] = value;
		return acc;
	}, {});
	queryParams.lang = newLang;
	const updatedQuery = Object.entries(queryParams)
		.map(([key, val]) => `${key}=${val}`)
		.join('&');
	return `${base}?${updatedQuery}`;
};

module.exports = { updateLangQuery };
