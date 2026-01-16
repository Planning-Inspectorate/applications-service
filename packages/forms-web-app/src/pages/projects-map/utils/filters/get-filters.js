const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('../../../_utils/filters/get-filters-view-model');
const { projectsMapI18nNamespace } = require('../../config');

/**
 * Prepare filter view models for projects map page
 *
 * Orchestrates filter data preparation in two steps:
 * 1. Formats raw filter data with translations for the checkbox accordion UI
 * 2. Identifies which filters are currently active based on query parameters
 *
 * This allows the view to display both available filters and highlight
 * the user's current selections.
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {Object} query - Query parameters containing active filter selections
 * @param {Array} rawFilters - Raw filter data from application service API
 * @returns {Object} Combined view model containing:
 *   - filters: Array of filter groups with translations (for checkbox accordion)
 *   - activeFilters: Array of active filter selections (for display/highlighting)
 *
 * @example
 * const filterData = getFilters(i18n, req.query, rawFiltersFromAPI);
 * // Returns: {
 * //   filters: [{name: 'region', label: 'Location', items: [...]}],
 * //   activeFilters: [{label: 'Location', tags: [...]}]
 * // }
 */
const getFilters = (i18n, query, rawFilters) => {
	// Create reusable i18n wrapper for filters namespace
	const filterI18n = {
		...i18n,
		t: (key) => i18n.t(`${projectsMapI18nNamespace}.${key}`) || i18n.t(key)
	};

	const filtersViewModel = getFiltersViewModel(filterI18n, rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
