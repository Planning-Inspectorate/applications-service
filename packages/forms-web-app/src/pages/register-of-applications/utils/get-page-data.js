const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { mapTitles } = require('../../_utils/map-titles');
const { allProjectsSubNavigationRoutes } = require('../../_utils/sub-navigation-routes');
const { documentsPerPage } = require('../../projects/utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/utils/pagination/pagination');
const {
	getRegisterOfApplicationsSortByLinks
} = require('./get-register-of-applications-sort-by-links');
const { getApplicationsDownloadURL } = require('../../../api/_utils/get-url');

const getPageData = (applications, query, pagination) => ({
	...mapTitles('Register of applications', 'Register of applications'),
	allProjectsSubNavigationRoutes,
	applications: mapApplications(applications),
	applicationsDownloadUrl: getApplicationsDownloadURL,
	totalApplicationsWithoutFilters: pagination.totalItemsWithoutFilters,
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	sortByLinks: getRegisterOfApplicationsSortByLinks(query),
	resultsPerPage: documentsPerPage(query),
	query
});

module.exports = {
	getPageData
};
