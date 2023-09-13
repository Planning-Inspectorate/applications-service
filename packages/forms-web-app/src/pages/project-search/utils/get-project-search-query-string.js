const { buildQueryString } = require('../../_utils/build-query-string');

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
		region: region || [],
		sector: sector || [],
		stage: stage || []
	});

module.exports = { getProjectSearchQueryString };
