const { checkBoxMapper } = require('../utils/ui-mappers');

const sortAlpha = (a, b) => {
	if (a.name < b.name) {
		return -1;
	}
	return 0;
};
const getDocumentTypeFilters = (newTypeFilters, typeList, otherTypeFiltersCount) => {
	const mappedFilters = [...newTypeFilters];
	let countedOtherTypeFiltersCount = otherTypeFiltersCount;
	const modifiedTypeFilters = [];
	const numberOfFiltersToDisplay = 5;

	mappedFilters.slice(-(newTypeFilters.length - numberOfFiltersToDisplay)).forEach(function (type) {
		countedOtherTypeFiltersCount += type.count;
	}, Object.create(null));

	const formatList = mappedFilters.slice(0, numberOfFiltersToDisplay).sort(sortAlpha);
	formatList.forEach(function (type) {
		modifiedTypeFilters.push(
			checkBoxMapper(`${type.name} (${type.count})`, type.name, typeList.includes(type.name))
		);
	}, Object.create(null));

	return {
		mappedFilters: formatList,
		countedOtherTypeFiltersCount,
		modifiedTypeFilters
	};
};

const handleEverythingElse = (
	mappedFilters,
	modifiedTypeFilters,
	countedOtherTypeFiltersCount,
	typeList
) => {
	const filterArray = [...modifiedTypeFilters];
	if (mappedFilters.length > 4) {
		filterArray.push(
			checkBoxMapper(
				`Everything else (${countedOtherTypeFiltersCount})`,
				'everything_else',
				typeList.includes('everything_else')
			)
		);
	}

	return filterArray;
};
module.exports = {
	getDocumentTypeFilters,
	handleEverythingElse
};
