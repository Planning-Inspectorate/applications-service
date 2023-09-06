const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { mapTitles } = require('../../_utils/map-titles');
const { documentsPerPage } = require('../../projects/utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/utils/pagination/pagination');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');

const getPageData = (query, applications, pagination) => ({
	...mapTitles('Projects', 'Project search'),
	applications: mapApplications(applications),
	pagination: getPagination(pagination),
	paginationQueryString: buildPaginationQueryString(query),
	resultsPerPage: documentsPerPage(query),
	sortByLinks: getProjectSearchSortByLinks(query),
	query
});

module.exports = {
	getPageData
};
