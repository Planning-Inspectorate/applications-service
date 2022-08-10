const removeFilterTypes = (filtersArray, typeFilterToRemove) => {
	if (
		!filtersArray ||
		!Array.isArray(filtersArray) ||
		filtersArray.length <= 0 ||
		!typeFilterToRemove ||
		typeof typeFilterToRemove !== 'string'
	) {
		return { ['result']: [], ['otherTypeFiltersCount']: 0 };
	}

	const otherTypeMatchArray = [];
	const regex = new RegExp(typeFilterToRemove, 'i');
	let otherTypeFiltersCount = 0;

	const result = filtersArray.filter(({ name: typeName, count }, index) => {
		if (regex.test(typeName)) {
			otherTypeMatchArray.push({ [index]: typeName });
		}
		let currentArrayItemObject;

		if (otherTypeMatchArray && otherTypeMatchArray.length > 0) {
			currentArrayItemObject = otherTypeMatchArray.find(
				(otherType) => Object.keys(otherType)[0] === index.toString()
			);
		}

		if (otherTypeMatchArray && otherTypeMatchArray.length > 0 && currentArrayItemObject) {
			const otherDocumentString = currentArrayItemObject[index];
			otherTypeFiltersCount += count;
			return typeName !== otherDocumentString;
		}

		return typeName;
	});

	return { result, otherTypeFiltersCount };
};

module.exports = { removeFilterTypes };
