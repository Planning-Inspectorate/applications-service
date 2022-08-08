const replaceControllerParamType = (paramsType, expectedParam, newParamType) => {
	if (!paramsType || !expectedParam || !newParamType) return;

	if (typeof paramsType === 'string' && paramsType === expectedParam) {
		return newParamType;
	}

	if (Array.isArray(paramsType) && paramsType.includes(expectedParam)) {
		const removedParamTypeList = paramsType.filter((t) => t !== expectedParam);

		if (paramsType.includes(newParamType)) {
			return removedParamTypeList;
		}

		removedParamTypeList.push(newParamType);

		return removedParamTypeList;
	}
};

module.exports = { replaceControllerParamType };
