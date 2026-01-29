const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

/**
 * Builds both the filter structure and active filters for the projects map
 *
 * Combines:
 * - Filter view model (groups and items for the accordion)
 * - Active filters view model (filters currently applied, shown as pills)
 *
 * @param {Object} i18n - i18n instance
 * @param {Object} query - Current query parameters
 * @param {Array} rawFilters - Raw filter items from the API
 * @returns {Object} Object with 'filters' (for accordion) and 'activeFilters' (for pills)
 */
const getFilters = (i18n, query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(i18n, rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
