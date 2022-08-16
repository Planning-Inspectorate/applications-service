const replaceControllerParamType = (paramsType, expectedParam, newParamType) => {
	if (
		!paramsType ||
		paramsType.length === 0 ||
		!expectedParam ||
		typeof expectedParam !== 'string' ||
		!newParamType
	)
		return;

	const regex = new RegExp(expectedParam, 'i');

	if (typeof paramsType === 'string' && regex.test(paramsType)) {
		return newParamType;
	}

	const matchResults = [];
	const result = [];

	if (Array.isArray(paramsType)) {
		for (const typeName of paramsType) {
			if (regex.test(typeName)) {
				matchResults.push(typeName);
			} else {
				result.push(typeName);
			}
		}

		if (matchResults.length > 0) {
			return result.concat(matchResults);
		}

		return result;
	}
};

module.exports = { replaceControllerParamType };
