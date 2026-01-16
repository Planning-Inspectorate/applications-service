const { buildQueryString } = require('../../_utils/build-query-string');

/**
 * Build query string for projects map API endpoint
 *
 * Converts URL query parameters to API query string format.
 * Includes filter parameters (region, sector, stage) if provided.
 *
 * @param {Object} query - Query parameters from request
 * @param {string|Array} [query.region=[]] - Region filter(s)
 * @param {string|Array} [query.sector=[]] - Sector filter(s)
 * @param {string|Array} [query.stage=[]] - Stage filter(s)
 * @returns {string} Query string starting with '?' (e.g., '?region[]=london&sector[]=energy')
 *
 * @example
 * getProjectsMapQueryString({ region: 'london', sector: ['energy'] })
 * // Returns: '?region=london&sector=energy'
 */
const getProjectsMapQueryString = ({ region, sector, stage } = {}) =>
	buildQueryString({
		region: region || [],
		sector: sector || [],
		stage: stage || []
	});

module.exports = { getProjectsMapQueryString };
