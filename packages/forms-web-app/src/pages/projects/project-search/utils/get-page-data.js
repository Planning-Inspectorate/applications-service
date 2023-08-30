const { buildPaginationQueryString } = require('../../../_utils/build-pagination-query-string');
const { mappedApplications } = require('../../_utils/mapped-applications');
const { documentsPerPage } = require('../../utils/pagination/documentsPerPage');
const { getPagination } = require('../../utils/pagination/pagination');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');

const getPageData = (query, applications, pagination) => ({
	applications: mappedApplications(applications),
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	resultsPerPage: documentsPerPage(query),
	sortByLinks: getProjectSearchSortByLinks(query)
});

module.exports = {
	getPageData
};
