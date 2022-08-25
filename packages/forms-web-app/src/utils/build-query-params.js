const buildQueryParams = (param, queryName, queryUrl) => {
	if (!param || !queryName || typeof queryName !== 'string' || typeof queryUrl !== 'string') {
		return '';
	}

	const queryParamList = param instanceof Array ? [...param] : [param];
	return `${queryUrl}&${queryName}=${queryParamList.join(`&${queryName}=`)}`;
};

module.exports = { buildQueryParams };
