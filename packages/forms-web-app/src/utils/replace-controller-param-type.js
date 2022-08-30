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

	if (Array.isArray(paramsType)) {
		const result = [];

		paramsType.forEach((typeName) => {
			if (regex.test(typeName)) result.push(newParamType);
			else result.push(typeName);
		});

		return [...new Set(result)];
	}
};

module.exports = { replaceControllerParamType };
