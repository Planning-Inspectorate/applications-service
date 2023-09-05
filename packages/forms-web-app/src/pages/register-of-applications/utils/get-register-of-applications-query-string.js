const { buildQueryString } = require('../../_utils/build-query-string');

const getRegisterOfApplicationsQueryString = ({
	page = 1,
	itemsPerPage: size = 25,
	sortBy: sort = ''
}) => buildQueryString({ page, size, sort });

module.exports = { getRegisterOfApplicationsQueryString };
