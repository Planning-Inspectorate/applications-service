const queryStringBuilder = (queryParams, includedParams, append = true) => {
	const defaultValue = '';

	if (
		!queryParams ||
		typeof queryParams !== 'object' ||
		!includedParams ||
		!Array.isArray(includedParams)
	)
		return defaultValue;

	const params = { ...queryParams };

	Object.keys(params).forEach((param) => {
		if (!includedParams.includes(param) || !params[param]) delete params[param];
	});

	const paramsArray = Object.keys(params);

	if (!paramsArray.length) return defaultValue;

	const queryStart = append ? '?' : '&';

	const queryString = Object.keys(params)
		.map((param) => {
			const paramsValue = params[param];
			if (!Array.isArray(paramsValue)) return `${param}=${encodeURIComponent(paramsValue)}`;

			const paramsValueQuery = paramsValue
				.map((paramsValueItem) => {
					return `${param}=${encodeURIComponent(paramsValueItem)}`;
				})
				.join('&');

			return paramsValueQuery;
		})
		.join('&');

	if (!queryStart || !queryString) return defaultValue;

	return `${queryStart}${queryString}`;
};

module.exports = { queryStringBuilder };
