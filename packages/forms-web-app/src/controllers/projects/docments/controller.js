const { VIEW } = require('../../../lib/views');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
const logger = require('../../../lib/logger');
const { applicationData } = require('./utils/application-data');
const { getDocuments } = require('./utils/documents/getDocuments');
const { getFilters } = require('./utils/filters/getFilters');
const { viewModel } = require('./utils/filters/view-model');
const { getPagination, getPaginationUrl } = require('./utils/pagination/pagination');

const getApplicationDocuments = async (req, res) => {
	try {
		const { query, params } = req;
		const { case_ref } = params;
		const { searchTerm } = query;

		const { paginationUrl, queryUrl } = getPaginationUrl(req);
		const { projectName } = await applicationData(case_ref);

		const pageFeatureToggles = featureToggles();
		const pageDataObj = pageData(case_ref);

		const { documents, filters, pagination } = await getDocuments(case_ref, query);
		const filteredView = getFilters(filters);

		const filtersViewModel = viewModel(filteredView, query);
		const paginationMap = getPagination(pagination);

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			documents,
			...pageFeatureToggles,
			...pageDataObj,
			...paginationMap,
			projectName,
			searchTerm,
			paginationUrl,
			queryUrl,
			filters: filtersViewModel
		});
	} catch (e) {
		logger.error(e);
	}
};

module.exports = {
	getApplicationDocuments
};
