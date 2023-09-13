const { getActiveFiltersViewModel } = require('./get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

const getFilters = (query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(rawFilters);
	const { filters, activeFilters } = getActiveFiltersViewModel(query, filtersViewModel);

	return {
		filters,
		activeFilters
	};
};

module.exports = { getFilters };
