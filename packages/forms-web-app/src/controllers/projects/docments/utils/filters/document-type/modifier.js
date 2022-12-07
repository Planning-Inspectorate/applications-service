const { removeFilterTypes } = require('../../../../../../utils/remove-filter-types');
const { getDocumentTypeFilters, handleEverythingElse } = require('./helpers');
const modifyDocumentTypeFilters = (typeFilters, typeList) => {
	let otherDocumentTypeFiltersCount = 0;

	const { result: newTypeFilters, otherTypeFiltersCount: removedTypesCount } = removeFilterTypes(
		typeFilters,
		'other'
	);

	otherDocumentTypeFiltersCount += removedTypesCount;
	const { mappedFilters, countedOtherTypeFiltersCount, modifiedTypeFilters } =
		getDocumentTypeFilters(newTypeFilters, typeList, otherDocumentTypeFiltersCount);

	const filteredArray = handleEverythingElse(
		mappedFilters,
		modifiedTypeFilters,
		countedOtherTypeFiltersCount,
		typeList
	);

	return filteredArray;
};

module.exports = {
	modifyDocumentTypeFilters
};
