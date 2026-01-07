const { buildQueryString } = require('../../_utils/build-query-string');
const { getFilterQueryParams } = require('../../_utils/get-filter-query-params');

/**
 * Build query string for projects map filtering
 *
 * Normalizes filter parameters (region, sector, stage) for backend API
 * Ensures empty arrays default to empty strings
 *
 * @param {Object} query - Query parameters from request
 * @param {Array} query.region - Selected regions
 * @param {Array} query.sector - Selected sectors
 * @param {Array} query.stage - Selected stages
 * @returns {string} Query string for backend API, e.g. "?region=east&sector=energy&stage=examination"
 */
const getProjectsMapQueryString = (query) => buildQueryString(getFilterQueryParams(query));

module.exports = { getProjectsMapQueryString };
