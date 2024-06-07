const logger = require('../../../lib/logger');
const { pageData } = require('./_utils/page-data');
const { featureToggles } = require('./_utils/feature-toggles');
const { getDocuments } = require('./_utils/documents/getDocuments');
const { getFilters } = require('./_utils/filters/getFilters');
const { getPagination, getPaginationUrl } = require('../_utils/pagination/pagination');
const { searchDocuments } = require('./_utils/documents/searchDocuments');
const { getApplicationData } = require('../_utils/get-application-data');
const { isClearAllFiltersDisplayed } = require('./_utils/is-clear-all-filters-displayed');
const { documentsPerPage } = require('../_utils/pagination/documentsPerPage');
const { isFiltersDisplayed } = require('./_utils/is-filters-displayed');

const view = 'projects/documents/view.njk';

const getProjectsDocumentsController = async (req, res) => {
	try {
		const { i18n, query, params } = req;
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

		const documentsView = getDocuments(i18n, documents, examinationLibraryDocument);
		const filteredView = getFilters(i18n, filters, query);
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
			paginationUrl,
			queryUrl,
			searchTerm,
			resultsPerPage
		});
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProjectsDocumentsController
};
