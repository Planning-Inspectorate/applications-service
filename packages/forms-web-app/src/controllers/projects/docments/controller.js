const { VIEW } = require('../../../lib/views');
const { searchDocumentsV2 } = require('../../../services/document.service');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
const { handleDocuments } = require('./utils/v2/documents/handle-documents');
const { handleFilters } = require('./utils/v2/filters/filters');
const { handleParams, getExaminationLibraryDocuments } = require('./utils/handle-params');
const { developersApplication } = require('./utils/config');
const { pagination } = require('./utils/pagination');
const logger = require('../../../lib/logger');
const { applicationData } = require('./utils/application-data');
const { getDocuments } = require('./utils/documents/getDocuments');
const { getFilters } = require('./utils/filters/getFilters');
const { viewModel } = require('./utils/filters/view-model');

const getApplicationDocuments = async (req, res) => {
	try {
		const { query, params } = req;
		const { case_ref } = params;
		const { searchTerm, stage, type, category } = query;

		const queryObject = {
			caseRef: case_ref,
			classification: 'all',
			page: '1',
			type: handleParams(type, 'other', 'everything_else'),
			category: handleParams(category, 'Application Document', developersApplication)
		};

		const { projectName } = await applicationData(case_ref);

		const buildQueryObject = { ...queryObject, searchTerm, stage, type, category };

		const pageFeatureToggles = featureToggles();
		const examinationLibraryResponse = await getExaminationLibraryDocuments(
			buildQueryObject,
			searchTerm
		);
		const searchDocuments = await searchDocumentsV2(buildQueryObject);
		const pageDataObj = pageData(buildQueryObject);
		const pageDocuments = handleDocuments(searchDocuments, examinationLibraryResponse);
		const pageObjectFilters = handleFilters(searchDocuments, stage, type, category);
		const paginationStuff = pagination(searchDocuments);

		const { documents, filters } = await getDocuments(case_ref);
		const filteredView = getFilters(filters);

		const filtersViewModel = viewModel(filteredView, query);

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			pageDocuments: { hide: pageDocuments },
			documents,
			...pageFeatureToggles,
			...pageDataObj,
			...pageObjectFilters,
			...paginationStuff,
			projectName,
			searchTerm,
			filters: filtersViewModel
		});
	} catch (e) {
		logger.error(e);
	}
};

module.exports = {
	getApplicationDocuments
};
