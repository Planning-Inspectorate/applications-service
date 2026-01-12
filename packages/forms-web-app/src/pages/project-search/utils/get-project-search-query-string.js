const { buildFilterQueryString } = require('../../_utils/build-filter-query-string');

/**
 * Build query string for project search API request
 *
 * Extends base filter query string with project-search specific parameters:
 * - Pagination (size, page)
 * - Sorting (sort)
 *
 * Uses shared buildFilterQueryString for consistent filter handling.
 *
 * @param {Object} params - Query parameters
 * @param {string} [params.searchTerm=''] - Search term
 * @param {string|Array} [params.region=[]] - Region filter(s)
 * @param {string|Array} [params.sector=[]] - Sector filter(s)
 * @param {string|Array} [params.stage=[]] - Stage filter(s)
 * @param {number} [params.itemsPerPage=25] - Items per page
 * @param {number} [params.page=1] - Current page
 * @param {string} [params.sortBy='+ProjectName'] - Sort order
 * @returns {string} Query string for API request
 */
const getProjectSearchQueryString = ({
	itemsPerPage,
	page,
	searchTerm,
	sortBy,
	region,
	sector,
	stage
}) =>
	buildFilterQueryString(
		{
			searchTerm,
			region,
			sector,
			stage
		},
		{
			size: itemsPerPage || 25,
			page: page || 1,
			sort: sortBy || '+ProjectName'
		}
	);

module.exports = { getProjectSearchQueryString };
