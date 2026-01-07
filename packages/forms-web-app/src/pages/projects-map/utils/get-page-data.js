const { getFilters } = require('./filters/get-filters');

/**
 * Prepare view data for projects map page
 *
 * Transforms raw backend data into view-ready format:
 * - Processes raw filters into checkbox-accordion compatible structure
 * - Marks applied filters as checked
 * - Builds pagination object
 *
 * Uses projects-map specific filter utilities (not project-search)
 * to ensure correct translation keys (projectsMap.filterLabels)
 *
 * @param {Object} i18n - i18n instance for translations
 * @param {Object} query - Query parameters (region, sector, stage, etc.)
 * @param {Array} rawFilters - Raw filter data from backend API
 * @param {Object} pagination - Pagination metadata
 * @returns {Object} View data with processed filters and pagination
 */
const getPageData = (i18n, query, rawFilters, pagination) => {
	// Process filters using projects-map specific utilities
	// This returns { filters, activeFilters, ... }
	const filterData = getFilters(i18n, query, rawFilters);

	return {
		...filterData,
		pagination,
		query
	};
};

module.exports = { getPageData };
