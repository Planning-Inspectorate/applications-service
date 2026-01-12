const { buildQueryString } = require('./build-query-string');

/**
 * Build query string from filter parameters
 * Accepts custom params while always including region, sector, stage filters
 *
 * Shared utility used by multiple pages (project-search, projects-map)
 * to consistently format filter and search query parameters.
 *
 * @param {Object} params - Query parameters
 * @param {string} [params.searchTerm=''] - Search term
 * @param {string|Array} [params.region=[]] - Region filter(s)
 * @param {string|Array} [params.sector=[]] - Sector filter(s)
 * @param {string|Array} [params.stage=[]] - Stage filter(s)
 * @param {Object} [customParams={}] - Additional page-specific params (e.g., pagination, sorting)
 * @returns {string} Query string starting with '?'
 */
const buildFilterQueryString = (params, customParams = {}) => {
	const queryParams = {
		searchTerm: params.searchTerm || '',
		region: params.region || [],
		sector: params.sector || [],
		stage: params.stage || [],
		...customParams
	};

	return buildQueryString(queryParams);
};

module.exports = { buildFilterQueryString };
