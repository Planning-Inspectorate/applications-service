const filterAllowedParams = (paramsArr, allowedParamsArr) => {
	const lowerCaseAllowedParamsArr = allowedParamsArr.map((param) => param.toLowerCase());
	const getOnlyAllowedParam = (param) => {
		const stageRegEx = /^stage-[1-8]$/i; //stage-1, stage-2...stage-8

		return stageRegEx.test(param) || lowerCaseAllowedParamsArr.includes(param.toLowerCase());
	};

	return paramsArr.filter(getOnlyAllowedParam);
};

module.exports = { filterAllowedParams };
