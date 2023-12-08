const { applicationsDownloadURL } = require('../../../api/applications-download/config');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { mapTitles } = require('../../_utils/map-titles');
const { documentsPerPage } = require('../../projects/_utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/_utils/pagination/pagination');
const { getFilters } = require('./filters/get-filters');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');
const { getRelatedContentLinks } = require('./get-related-content-links');

const getPageData = (query, applications, filters, pagination) => ({
	...mapTitles('Projects', 'Project search'),
	...getFilters(query, filters),
	applications: mapApplications(applications),
	applicationsDownloadURL,
	totalApplicationsWithoutFilters: pagination.totalItemsWithoutFilters,
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	query,
	resultsPerPage: documentsPerPage(query),
	sortByLinks: getProjectSearchSortByLinks(query),
	relatedContentLinks: getRelatedContentLinks
});

module.exports = {
	getPageData
};
