const filterAllowedParams = (paramsArr, allowedParamsArr) => {
	const getOnlyAllowedParam = (param) => {
		const stageRegEx = /^stage-[1-8]$/i; //stage-1, stage-2...stage-8

		return stageRegEx.test(param) || allowedParamsArr.includes(param.toLowerCase());
	};

	return paramsArr.filter(getOnlyAllowedParam);
};

module.exports = { filterAllowedParams };
