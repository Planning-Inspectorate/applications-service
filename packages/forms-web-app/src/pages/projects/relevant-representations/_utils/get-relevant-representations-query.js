const { buildQueryString } = require('../../../_utils/build-query-string');

const getRelevantRepresentationsQuery = (
	{ case_ref },
	{ itemsPerPage, page, searchTerm, type }
) => {
	return buildQueryString({
		applicationId: case_ref,
		size: itemsPerPage || 25,
		page: page || 1,
		searchTerm: searchTerm || [],
		type: type || []
	});
};

module.exports = { getRelevantRepresentationsQuery };
