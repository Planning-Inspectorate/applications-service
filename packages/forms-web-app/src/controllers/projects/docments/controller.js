const { VIEW } = require('../../../lib/views');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
const logger = require('../../../lib/logger');
const { getApplicationData } = require('./utils/get-application-data');
const { getDocuments } = require('./utils/documents/getDocuments');
const { getFilters } = require('./utils/filters/getFilters');
const { getPagination, getPaginationUrl } = require('./utils/pagination/pagination');
const { searchDocuments } = require('./utils/documents/searchDocuments');

const getApplicationDocuments = async (req, res) => {
	try {
		const { query, params } = req;
		const { case_ref } = params;
		const { searchTerm } = query;

		const { paginationUrl, queryUrl } = getPaginationUrl(req);
		const { projectName } = await getApplicationData(case_ref);

		const pageFeatureToggles = featureToggles();
		const pageDataObj = pageData(case_ref);

		const { documents, filters, pagination } = await searchDocuments(case_ref, query);
		const documentsView = getDocuments(documents);
		const filteredView = getFilters(filters, query);
		const paginationView = getPagination(pagination);

		return res.render(VIEW.PROJECTS.DOCUMENTS, {
			documents: documentsView,
			...pageFeatureToggles,
			...pageDataObj,
			...paginationView,
			projectName,
			searchTerm,
			paginationUrl,
			queryUrl,
			filters: filteredView
		});
	} catch (e) {
		logger.error(e);
	}
};

module.exports = {
	getApplicationDocuments
};
