const { applicationsDownloadURL } = require('../../../api/applications-download/config');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { documentsPerPage } = require('../../projects/_utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/_utils/pagination/pagination');
const { getFilters } = require('./filters/get-filters');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');
const { getRelatedContentLinks } = require('./get-related-content-links');
const { getProjectsMapURL } = require('../../projects-map/utils/get-projects-map-url');
const { featureFlag } = require('../../../config');

const getPageData = (i18n, query, applications, filters, pagination) => ({
	...getFilters(i18n, query, filters),
	applications: mapApplications(i18n, applications),
	applicationsDownloadURL,
	totalApplicationsWithoutFilters: pagination.totalItemsWithoutFilters,
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	projectsMapURL: featureFlag.enableProjectsMap ? getProjectsMapURL(query) : '#',
	query,
	resultsPerPage: documentsPerPage(query),
	sortByLinks: getProjectSearchSortByLinks(i18n, query),
	relatedContentLinks: getRelatedContentLinks(i18n)
});

module.exports = {
	getPageData
};
