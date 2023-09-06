const { buildQueryString } = require('../../_utils/build-query-string');

const getProjectSearchQueryString = ({
	page = 1,
	searchTerm = '',
	itemsPerPage: size = 25,
	sortBy: sort = 'ProjectName'
}) => buildQueryString({ page, searchTerm, size, sort });

module.exports = { getProjectSearchQueryString };
