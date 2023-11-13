const { titleCase } = require('../../../../utils/string-case');
const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');

const filterNameID = 'type';

const getFilterViewModel = ({ count, name }) => {
	const filterName = titleCase(name);
	return {
		checked: false,
		label: filterName,
		text: `${filterName} (${count})`,
		value: name
	};
};

const getFiltersViewModel = (filters) => [
	{
		items: filters.map((filter) => getFilterViewModel(filter)),
		name: filterNameID
	}
];

const getFilters = (query, rawFilters) => {
	const queryTypeValues = {
		[filterNameID]: query[filterNameID]
	};
	const filtersViewModel = getFiltersViewModel(rawFilters);
	const { activeFilters, filters } = getActiveFiltersViewModel(queryTypeValues, filtersViewModel);

	return {
		activeFilters,
		filters: filters[0].items,
		filterNameID
	};
};

module.exports = { getFilters };
