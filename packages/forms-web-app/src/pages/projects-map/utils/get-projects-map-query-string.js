const { buildQueryString } = require('../../_utils/build-query-string');

/**
 * Builds a query string for the projects-map API call
 *
 * Transforms the current page query parameters into an API query string.
 * Supports filtering by region, sector, and stage (no search, sorting, or pagination for map).
 *
 * @param {Object} query - Query parameters from the request
 * @returns {string} Query string for API (e.g., '?region=south_east&sector=energy')
 * @example
 * getProjectsMapQueryString({ region: 'south_east', sector: ['energy', 'rail'] })
 * // Returns: '?region=south_east&sector=energy&sector=rail'
 */
const getProjectsMapQueryString = ({ region, sector, stage }) =>
	buildQueryString({
		region: region || [],
		sector: sector || [],
		stage: stage || []
	});

module.exports = { getProjectsMapQueryString };
