const { buildPaginationQueryString } = require('../../../_utils/build-pagination-query-string');
const { mappedApplications } = require('../../_utils/mapped-applications');
const { documentsPerPage } = require('../../utils/pagination/documentsPerPage');
const { getPagination } = require('../../utils/pagination/pagination');
const { getApplicationsRegisterSortByLinks } = require('./get-applications-register-sort-links');

const getPageData = (applications, query, pagination) => ({
	applications: mappedApplications(applications),
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	sortByLinks: getApplicationsRegisterSortByLinks(query),
	resultsPerPage: documentsPerPage(query)
});

module.exports = {
	getPageData
};
