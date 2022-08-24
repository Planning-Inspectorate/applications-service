const getCategoryFilterType = (categoryTypeFilters, filterTypeItemName) => {
	if (
		!categoryTypeFilters ||
		!Array.isArray(categoryTypeFilters) ||
		categoryTypeFilters.length === 0 ||
		!filterTypeItemName ||
		typeof filterTypeItemName !== 'string'
	) {
		return;
	}

	try {
		let i = 0;
		let result;
		const regex = new RegExp(filterTypeItemName, 'i');

		while (i < categoryTypeFilters.length) {
			const categoryObject = categoryTypeFilters[i];
			const { category: typeName } = categoryObject;

			if (regex.test(typeName)) {
				result = categoryObject;
				break;
			}
			i++;
		}

		if (result) {
			return [{ name: 'Application Document', count: result.count }];
		}

		return;
	} catch (err) {
		console.error(err);
	}
};

module.exports = { getCategoryFilterType };
