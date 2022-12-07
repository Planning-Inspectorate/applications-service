const { VIEW } = require('../../../lib/views');
const { pageData } = require('./utils/page-data');
const { featureToggles } = require('./utils/feature-toggles');
// const { pagination } = require('./utils/pagination');
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

		console.log('QUERY: ', query);
		const queryObject = {
			caseRef: case_ref,
			classification: 'all',
			page: '1'
		};

		const { projectName } = await applicationData(case_ref);

		const buildQueryObject = { ...queryObject, searchTerm, stage, type, category };

		const pageFeatureToggles = featureToggles();
		const pageDataObj = pageData(buildQueryObject);

		const { documents, filters } = await getDocuments(case_ref, query);
		const filteredView = getFilters(filters);

		const filtersViewModel = viewModel(filteredView, query);

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			documents,
			...pageFeatureToggles,
			...pageDataObj,
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
