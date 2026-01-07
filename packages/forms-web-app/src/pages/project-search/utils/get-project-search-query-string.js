const { buildQueryString } = require('../../_utils/build-query-string');
const { getFilterQueryParams } = require('../../_utils/get-filter-query-params');

const getProjectSearchQueryString = ({
	itemsPerPage,
	page,
	searchTerm,
	sortBy,
	region,
	sector,
	stage
}) =>
	buildQueryString({
		size: itemsPerPage || 25,
		page: page || 1,
		searchTerm: searchTerm || '',
		sort: sortBy || '+ProjectName',
		...getFilterQueryParams({ region, sector, stage })
	});

module.exports = { getProjectSearchQueryString };
