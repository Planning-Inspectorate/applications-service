const { buildQueryString } = require('../../../_utils/build-query-string');

const getApplicationsRegisterQueryString = ({ page = 1, itemsPerPage: size = 25, sortBy }) =>
	buildQueryString({ page, size, sortBy });

module.exports = { getApplicationsRegisterQueryString };
