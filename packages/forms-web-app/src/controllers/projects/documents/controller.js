const { VIEW } = require('../../../lib/views');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
const logger = require('../../../lib/logger');
const { getDocuments } = require('./utils/documents/getDocuments');
const { getFilters } = require('./utils/filters/getFilters');
const { getPagination, getPaginationUrl } = require('./utils/pagination/pagination');
const { searchDocuments } = require('./utils/documents/searchDocuments');
const { getApplicationData } = require('./utils/get-application-data');

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

		return res.render(VIEW.PROJECTS.DOCUMENTS, {
			...documentsView,
			...pageFeatureToggles,
			...pageDataObj,
			...paginationView,
			filters: filteredView.filters,
			activeFilters: filteredView.activeFilters,
			errorSummary: filteredView.datesFilterErrorSummary,
			projectName,
			pageTitle: `Documents | ${projectName}`,
			paginationUrl,
			queryUrl,
			searchTerm,
			title: 'Documents'
		});
	} catch (e) {
		logger.error(e);
		return res.render('error/unhandled-exception');
	}
};

module.exports = {
	getApplicationDocuments
};
