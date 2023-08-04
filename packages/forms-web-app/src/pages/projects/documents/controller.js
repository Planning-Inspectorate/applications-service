const logger = require('../../../lib/logger');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
const { getDocuments } = require('./utils/documents/getDocuments');
const { getFilters } = require('./utils/filters/getFilters');
const { getPagination, getPaginationUrl } = require('../utils/pagination/pagination');
const { searchDocuments } = require('./utils/documents/searchDocuments');
const { getApplicationData } = require('../_utils/get-application-data');
const { isClearAllFiltersDisplayed } = require('./utils/is-clear-all-filters-displayed');
const { documentsPerPage } = require('../utils/pagination/documentsPerPage');
const { isFiltersDisplayed } = require('./utils/is-filters-displayed');

const view = 'projects/documents/index.njk';
const getApplicationDocuments = async (req, res) => {
	try {
		const { query, params } = req;
		const { case_ref } = params;
		const { searchTerm } = query;

		const { paginationUrl, queryUrl } = getPaginationUrl(req);

		const { projectName } = await getApplicationData(case_ref);

		const pageFeatureToggles = featureToggles();
		const pageDataObj = await pageData(case_ref);

		const { documents, examinationLibraryDocument, filters, pagination } = await searchDocuments(
			case_ref,
			query
		);

		const documentsView = getDocuments(documents, examinationLibraryDocument);
		const filteredView = getFilters(filters, query);
		const paginationView = getPagination(pagination);
		const resultsPerPage = documentsPerPage(query);

		return res.render(view, {
			...documentsView,
			...pageFeatureToggles,
			...pageDataObj,
			...paginationView,
			displayClearAllFilters: isClearAllFiltersDisplayed(query, filteredView.activeFilters),
			filters: filteredView.filters,
			displayFilters: isFiltersDisplayed(filteredView.filters),
			activeFilters: filteredView.activeFilters,
			errorSummary: filteredView.datesFilterErrorSummary,
			projectName,
			pageTitle: `Documents | ${projectName}`,
			paginationUrl,
			queryUrl,
			searchTerm,
			title: 'Documents',
			resultsPerPage
		});
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getApplicationDocuments
};
