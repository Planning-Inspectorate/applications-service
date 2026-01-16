const { getFilters } = require('./filters/get-filters');

/**
 * Prepare page data for projects map view
 *
 * Processes filter information from the application service and formats it
 * for rendering in the view. This includes available filters for the checkbox
 * accordion UI and active filters for display.
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {Object} query - Query parameters object containing filter selections
 * @param {Array} applications - Filtered applications array (reserved for future use)
 * @param {Array} rawFilters - Raw filters data from application service
 * @returns {Object} View data object containing:
 *   - filters: Formatted filter data for checkbox accordion UI
 *   - activeFilters: Active filter selections for display/highlighting
 *
 * @example
 * const pageData = getPageData(i18n, query, applications, rawFilters);
 * // Returns: {
 * //   filters: [...],
 * //   activeFilters: [...]
 * // }
 */
const getPageData = (i18n, query, applications, rawFilters) => {
	const filterData = getFilters(i18n, query, rawFilters);

	return filterData;
};

module.exports = {
	getPageData
};
