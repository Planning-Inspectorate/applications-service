const { applicationsDownloadURL } = require('../../../api/applications-download/config');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { mapApplications } = require('../../_utils/map-applications');
const { mapTitles } = require('../../_utils/map-titles');
const { documentsPerPage } = require('../../projects/_utils/pagination/documentsPerPage');
const { getPagination } = require('../../projects/_utils/pagination/pagination');
const {
	getRegisterOfApplicationsSortByLinks
} = require('./get-register-of-applications-sort-by-links');

const getPageData = (i18n, applications, query, pagination) => ({
	...mapTitles('Register of applications', 'Register of applications'),
	applications: mapApplications(i18n, applications),
	applicationsDownloadURL,
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
