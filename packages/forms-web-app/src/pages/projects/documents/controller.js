const logger = require('../../../lib/logger');
const { pageData } = require('./_utils/page-data');
const { featureToggles } = require('./_utils/feature-toggles');
const { getDocuments } = require('./_utils/documents/getDocuments');
const { getFilters } = require('./_utils/filters/getFilters');
const { getPagination, getPaginationUrl } = require('../_utils/pagination/pagination');
const { searchDocuments } = require('./_utils/documents/searchDocuments');
const { isClearAllFiltersDisplayed } = require('./_utils/is-clear-all-filters-displayed');
const { documentsPerPage } = require('../_utils/pagination/documentsPerPage');
const { isLangWelsh } = require('../../_utils/is-lang-welsh');
const { isFiltersDisplayed } = require('./_utils/is-filters-displayed');
const { queryStringBuilder } = require('../../../utils/query-string-builder');
const { getProjectsDocumentsURL } = require('./_utils/get-projects-documents-url');
const { getExaminationLibraryDocument } = require('../../services');

const view = 'projects/documents/view.njk';

const getProjectsDocumentsController = async (req, res) => {
	try {
		const { i18n, query, params } = req;
		const { case_ref } = params;
		const { searchTerm } = query;
		const { locals } = res;
		const { applicationData } = locals;
		const { isMaterialChange, projectName } = applicationData;

		const { paginationUrl, queryUrl } = getPaginationUrl(req);
		const pageFeatureToggles = featureToggles();
		const pageDataObj = pageData(case_ref);

		const { documents, filters, pagination } = await searchDocuments(case_ref, {
			...query,
			isMaterialChange
		});

		const examinationLibraryDocument = await getExaminationLibraryDocument(case_ref);

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
			resultsPerPage,
			langIsWelsh: isLangWelsh(i18n.language)
		});
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postProjectsDocumentsController = async (req, res) => {
	try {
		const {
			body,
			params: { case_ref }
		} = req;

		const queryParamsToKeep = Object.keys(body);
		const queryString = queryStringBuilder(body, queryParamsToKeep);
		const documentsURL = getProjectsDocumentsURL(case_ref);

		return res.redirect(`${documentsURL}${queryString}`);
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProjectsDocumentsController,
	postProjectsDocumentsController
};
