const removeIt = (key, value, removeKey, removeValue) => key === removeKey && value === removeValue;
const isNotPaginationQuery = (key) => key !== 'page';
const getActiveFilterQueryParamsWithRemovedFilter = (queryObj, removeMe) => {
	const URL = new URLSearchParams();

	for (const [key, value] of Object.entries(queryObj)) {
		if (Array.isArray(value)) {
			value.forEach((item) => {
				if (!removeIt(key, item, removeMe.key, removeMe.value)) URL.append(key, item);
			});
		} else {
			if (!removeIt(key, value, removeMe.key, removeMe.value) && isNotPaginationQuery(key))
				URL.append(key, value);
		}
	}

	return URL.toString();
};

module.exports = {
	getActiveFilterQueryParamsWithRemovedFilter
};
