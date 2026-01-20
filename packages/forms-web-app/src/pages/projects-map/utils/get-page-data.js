const { getFilters } = require('./filters/get-filters');
const { getProjectSearchURL } = require('../../project-search/utils/get-project-search-url');
const { featureFlag } = require('../../config');

/**
 * Builds the complete page data object for the projects map view
 *
 * Orchestrates data assembly including:
 * - Filter groups with active filter state
 * - Active filter pills for display
 * - Map configuration with filtered markers
 * - Links to other views
 *
 * @param {Object} i18n - i18n instance
 * @param {Object} query - Current query parameters (applied filters)
 * @param {Array} mapMarkers - GeoJSON features array for the map
 * @param {Array} filters - Raw filter items from API
 * @returns {Object} Complete page data ready for template rendering
 */
const getPageData = (i18n, query, mapMarkers, filters) => ({
	...getFilters(i18n, query, filters),
	mapConfig: {
		markers: mapMarkers
	},
	projectSearchURL: featureFlag.enableProjectsMap ? getProjectSearchURL(query) : '#',
	query
});

module.exports = {
	getPageData
};
