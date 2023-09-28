const { getApplicationsDownloadURL } = require('../../../api/_utils/get-url');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { mapTitles } = require('../../_utils/map-titles');
const { allProjectsSubNavigationRoutes } = require('../../_utils/sub-navigation-routes');
const { documentsPerPage } = require('../../projects/utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/utils/pagination/pagination');
const { getFilters } = require('./filters/get-filters');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');

const getPageData = (query, applications, filters, pagination) => ({
	...mapTitles('Projects', 'Project search'),
	...getFilters(query, filters),
	allProjectsSubNavigationRoutes,
	applications: mapApplications(applications),
	applicationsDownloadUrl: getApplicationsDownloadURL,
	totalApplicationsWithoutFilters: pagination.totalItemsWithoutFilters,
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	query,
	resultsPerPage: documentsPerPage(query),
	sortByLinks: getProjectSearchSortByLinks(query)
});

module.exports = {
	getPageData
};
