const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

const getFilters = (i18n, query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(i18n, rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
