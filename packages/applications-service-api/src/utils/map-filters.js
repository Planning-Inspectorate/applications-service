const mapFilters = (filterArray, elementNameToFilter) => {
	if (
		!filterArray ||
		!Array.isArray(filterArray) ||
		filterArray.length === 0 ||
		!elementNameToFilter ||
		typeof elementNameToFilter !== 'string'
	) {
		return { ['result']: undefined, ['otherTypesToAdd']: undefined };
	}

	const regex = new RegExp(elementNameToFilter, 'i');
	const otherTypesToAdd = [];
	const result = [];

	for (const filterItem of filterArray) {
		const { filter_1: filterTypeName } = filterItem;

		if (!filterTypeName) {
			return { ['result']: undefined, ['otherTypesToAdd']: undefined };
		}

		const otherTypeMatch = regex.test(filterTypeName);

		if (otherTypeMatch) {
			otherTypesToAdd.push(filterTypeName);
		} else {
			result.push(filterTypeName);
		}
	}

	return { result, otherTypesToAdd };
};

module.exports = { mapFilters };
