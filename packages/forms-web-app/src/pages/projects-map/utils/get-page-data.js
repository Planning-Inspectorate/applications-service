const { getFilters } = require('./filters/get-filters');

/**
 * Prepare page data for projects map view
 *
 * Processes filter information from the application service and formats it
 * for rendering in the view. This includes active filters display and filter
 * UI state for the checkbox accordion.
 *
 * Note: pagination is not currently used for projects map but included for
 * consistency with project-search and future extensibility.
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {Object} query - Query parameters object containing filter selections
 * @param {Array} applications - Filtered applications array (reserved for future use)
 * @param {Array} rawFilters - Raw filters data from application service
 * @param {Object} pagination - Pagination data including totalItems, currentPage, etc.
 * @returns {Object} View data object containing:
 *   - filters: Formatted filter data for checkbox accordion UI
 *   - activeFilters: Active filter selections for highlighting
 *   - pagination: Pagination metadata
 *
 * @example
 * const pageData = getPageData(i18n, query, applications, rawFilters, pagination);
 * // Returns: {
 * //   filters: [...],
 * //   activeFilters: [...],
 * //   pagination: {...}
 * // }
 */
const getPageData = (i18n, query, applications, rawFilters, pagination) => {
	const filterData = getFilters(i18n, query, rawFilters);

	return {
		...filterData,
		pagination
	};
};

module.exports = {
	getPageData
};
