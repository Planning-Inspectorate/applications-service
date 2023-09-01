const { buildQueryString } = require('../../../_utils/build-query-string');

const getProjectSearchQueryString = ({ page, pageSize, sortBy }) =>
	buildQueryString({ page, pageSize, sortBy });

module.exports = { getProjectSearchQueryString };
