const { getAppData } = require('../../../services/application.service');
const { searchDocumentsV2 } = require('../../../services/document.service');

const { VIEW } = require('../../../lib/views');
const { handleParams } = require('./utils/handleParams');
const { pageData } = require('./utils/pageData');
const { handleDocuments } = require('./utils/documents');
const { handleFilters } = require('./utils/filters');
const { featureToggles } = require('./utils/featureToggles');

const logger = require('../../../lib/logger');

const developersApplication = "Developer's Application";
const getApplicationDocuments = async (req, res) => {
	try {
		const { query } = req;
		const applicationResponse = await getAppData(req.params.case_ref);

		if (applicationResponse.resp_code !== 200) throw new Error('Documents list response not 200');

		const { searchTerm, stage, type, category } = query;

		const { params, examinationLibraryResponse } = await handleParams(
			req.params,
			req.query,
			searchTerm
		);

		const response = await searchDocumentsV2(params);

		const pageDataObj = pageData(req.params, response, applicationResponse);
		const pageDataDocuments = handleDocuments(response, examinationLibraryResponse);

		const categoryList = category === developersApplication ? 'Application Document' : category;

		const pageDataFilters = handleFilters(response, stage, type, categoryList);
		const pageDataFeatureToggles = featureToggles();

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			...pageDataObj,
			...pageDataDocuments,
			...pageDataFilters,
			...pageDataFeatureToggles,
			searchTerm: params.searchTerm
		});
	} catch (e) {
		logger.error(e);
		res.send('ERROR');
	}
};

module.exports = {
	getApplicationDocuments
};
