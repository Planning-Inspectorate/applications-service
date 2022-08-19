const queryStringBuilder = (params, includedParams) => {
	if (!params || typeof params !== 'object' || !includedParams || !Array.isArray(includedParams))
		return '';

	Object.keys(params).forEach((param) => {
		if (!includedParams.includes(param) || !params[param]) delete params[param];
	});

	if (!Object.keys(params).length) return '';

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

	return `?${queryString}`;
};

module.exports = { queryStringBuilder };
