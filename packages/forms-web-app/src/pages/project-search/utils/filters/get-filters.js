const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

const getFilters = (query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
