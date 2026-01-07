/**
 * Extract and normalize filter query parameters
 *
 * Converts filter parameters to default empty arrays if not provided
 * Used by pages with region, sector, and stage filtering
 *
 * @param {Object} query - Query parameters object
 * @param {Array|string} query.region - Region filter values
 * @param {Array|string} query.sector - Sector filter values
 * @param {Array|string} query.stage - Stage filter values
 * @returns {Object} Normalized filter parameters with empty array defaults
 */
const getFilterQueryParams = (query) => ({
	region: query.region || [],
	sector: query.sector || [],
	stage: query.stage || []
});

module.exports = { getFilterQueryParams };
