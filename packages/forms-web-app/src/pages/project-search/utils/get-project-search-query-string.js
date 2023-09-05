const { buildQueryString } = require('../../_utils/build-query-string');

const getProjectSearchQueryString = ({ page = 1, itemsPerPage: size = 25, sortBy: sort = '' }) =>
	buildQueryString({ page, size, sort });

module.exports = { getProjectSearchQueryString };
