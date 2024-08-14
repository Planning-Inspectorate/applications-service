const { titleCase } = require('../../../../../utils/string-case');
const {
	getActiveFiltersViewModel
} = require('../../../../_utils/filters/get-active-filters-view-model');

const filterNameID = 'type';

const getFilterViewModel = ({ count, name, name_cy }, langIsWelsh) => {
	const filterName = titleCase(langIsWelsh && name_cy ? name_cy : name);
	return {
		checked: false,
		label: filterName,
		text: `${filterName} (${count})`,
		value: name
	};
};

const getFiltersViewModel = (filters, langIsWelsh) => [
	{
		items: filters.map((filter) => getFilterViewModel(filter, langIsWelsh)),
		name: filterNameID
	}
];

const getFilters = (query, rawFilters, langIsWelsh) => {
	const queryTypeValues = {
		[filterNameID]: query[filterNameID]
	};
	const filtersViewModel = getFiltersViewModel(rawFilters, langIsWelsh);
	const { activeFilters, filters } = getActiveFiltersViewModel(queryTypeValues, filtersViewModel);

	return {
		activeFilters,
		filters: filters[0].items,
		filterNameID
	};
};

module.exports = { getFilters };
