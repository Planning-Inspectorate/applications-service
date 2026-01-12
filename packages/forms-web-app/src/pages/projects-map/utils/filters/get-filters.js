const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('../../../_utils/filters/get-filters-view-model');
const { projectsMapI18nNamespace } = require('../../config');

/**
 * Get filters view model for projects map page
 *
 * Orchestrates filter data preparation in two steps:
 * 1. Formats raw filter data with translations for the checkbox accordion UI
 * 2. Identifies which filters are currently active based on query parameters
 *
 * This allows the view to display both the available filters and highlight
 * the user's current selections.
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {Object} query - Query parameters containing active filter selections
 * @param {Array} rawFilters - Raw filter data from application service API
 * @returns {Object} Combined view model containing:
 *   - filters: Array of filter groups with translations (for checkbox accordion)
 *   - activeFilters: Array of active filter selections (for highlighting/display)
 *
 * @example
 * const filterData = getFilters(i18n, req.query, rawFiltersFromAPI);
 * // Returns: {
 * //   filters: [{name: 'region', items: [...]}],
 * //   activeFilters: [{label: 'Location', tags: [...]}]
 * // }
 */
const getFilters = (i18n, query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(i18n, projectsMapI18nNamespace, rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
