const { getActiveFiltersViewModel } = require('./get-active-filters-view-model');
const { getFiltersViewModel } = require('./get-filters-view-model');

/**
 * Builds filters and activeFilters view model for a given i18n namespace.
 * Shared between project-search and projects-map pages.
 *
 * @param {Object} i18n - i18next instance
 * @param {Object} query - Express query object
 * @param {Array} rawFilters - Raw filter data from API
 * @param {string} i18nNamespace - Namespace containing filterLabels translation keys
 */
const getFilters = (i18n, query, rawFilters, i18nNamespace) => {
	const filtersViewModel = getFiltersViewModel(i18n, rawFilters, i18nNamespace);
	return getActiveFiltersViewModel(query, filtersViewModel);
};

module.exports = { getFilters };
