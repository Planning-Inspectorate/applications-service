const { buildFilterQueryString } = require('../../_utils/build-filter-query-string');

/**
 * Build query string for projects map API request
 *
 * Converts query parameters to API-compatible query string.
 * Currently includes only filters and search term.
 * Can be extended in the future to support:
 * - Zoom level preferences
 * - Bounds-based filtering
 * - Other map-specific parameters
 *
 * @param {Object} params - Query parameters
 * @param {string} [params.searchTerm=''] - Search term
 * @param {string|Array} [params.region=[]] - Region filter(s)
 * @param {string|Array} [params.sector=[]] - Sector filter(s)
 * @param {string|Array} [params.stage=[]] - Stage filter(s)
 * @returns {string} Query string for API request
 *
 * @example
 * const qs = getProjectsMapQueryString({ region: 'london', sector: 'energy' });
 * // Returns: "?searchTerm=&region=london&sector=energy&stage="
 */
const getProjectsMapQueryString = (params) => buildFilterQueryString(params);

module.exports = { getProjectsMapQueryString };
