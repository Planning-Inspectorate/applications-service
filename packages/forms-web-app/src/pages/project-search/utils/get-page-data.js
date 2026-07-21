const { applicationsDownloadURL } = require('../../../api/applications-download/config');
const { mapApplications } = require('../../_utils/map-applications');
const { getFilters } = require('./filters/get-filters');
const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');
const { getRelatedContentLinks } = require('./get-related-content-links');
const { getProjectsMapURL } = require('../../projects-map/utils/get-projects-map-url');
const { queryStringBuilder } = require('../../../utils/query-string-builder');

const getPageData = (i18n, query, applications, filters, totalItems, totalItemsWithoutFilters) => {
	const queryString = queryStringBuilder(query, Object.keys(query), true);

	return {
		...getFilters(i18n, query, filters),
		applications: mapApplications(i18n, applications),
		applicationsDownloadURL,
		totalItems,
		totalApplicationsWithoutFilters: totalItemsWithoutFilters,
		query,
		queryString,
		sortByLinks: getProjectSearchSortByLinks(i18n, query),
		relatedContentLinks: getRelatedContentLinks(i18n),
		projectsMapURL: getProjectsMapURL()
	};
};

module.exports = {
	getPageData
};
