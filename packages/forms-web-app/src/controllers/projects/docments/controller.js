const { VIEW } = require('../../../lib/views');
const { searchDocumentsV2 } = require('../../../services/document.service');
const { pageData } = require('./utils/pageData');
const { featureToggles } = require('./utils/featureToggles');
const { handleDocuments } = require('./utils/documents');
const { handleFilters } = require('./utils/filters');
const { handleParams, getExaminationLibraryDocuments } = require('./utils/handleParams');
const { developersApplication } = require('./utils/config');
const { pagination } = require('./utils/pagination');
const logger = require('../../../lib/logger');
const { applicationData } = require('./utils/applicationData');

const getApplicationDocuments = async (req, res) => {
	try {
		const { case_ref } = req.params;
		const { searchTerm, stage, type, category } = req.query;

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

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			...pageDocuments,
			...pageFeatureToggles,
			...pageDataObj,
			...pageObjectFilters,
			...paginationStuff,
			projectName,
			searchTerm
		});
	} catch (e) {
		logger.error(e);
	}
};

module.exports = {
	getApplicationDocuments
};
