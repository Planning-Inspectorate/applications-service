const { buildQueryString } = require('../../_utils/build-query-string');

const getProjectSearchQueryString = ({ searchTerm, sortBy, region, sector, stage }) =>
	buildQueryString({
		searchTerm: searchTerm || '',
		sort: sortBy || '+ProjectName',
		region: region || [],
		sector: sector || [],
		stage: stage || []
	});

module.exports = { getProjectSearchQueryString };
