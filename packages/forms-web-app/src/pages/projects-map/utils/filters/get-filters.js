const {
	getActiveFiltersViewModel
} = require('../../../_utils/filters/get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

/**
 * Get filters for projects map page
 *
 * Processes raw filter data from backend into view-ready format:
 * - Builds filter groups with checkboxes
 * - Marks applied filters as checked
 * - Applies filter ordering (region → sector → stage)
 *
 * Uses projects-map specific translations (projectsMap.filterLabels)
 *
 * @param {Object} i18n - i18n instance for translations
 * @param {Object} query - Query parameters (which filters are applied)
 * @param {Array} rawFilters - Raw filter data from backend API
 * @returns {Object} Processed filters object with { filters, activeFilters }
 */
const getFilters = (i18n, query, rawFilters) => {
	const filtersViewModel = getFiltersViewModel(i18n, rawFilters);

	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
