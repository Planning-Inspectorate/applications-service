const { VIEW } = require('../../../lib/views');
const { getAppData } = require('../../../services/application.service');
const { searchDocumentsV2 } = require('../../../services/document.service');
const { pageData } = require('./utils/pageData');
const { featureToggles } = require('./utils/featureToggles');
const { replaceControllerParamType } = require('../../../utils/replace-controller-param-type');
const { handleDocuments } = require('./utils/documents');
const { handleFilters } = require('./utils/filters');

const documentExaminationLibraryId = 'examination library';
exports.getApplicationDocuments = async (req, res) => {
	const developersApplication = "Developer's Application";

	const applicationResponse = await getAppData(req.params.case_ref);

	if (applicationResponse.resp_code === 200) {
		const projectName = applicationResponse.data.ProjectName;

		const params = {
			caseRef: req.params.case_ref,
			classification: 'all',
			page: '1',
			...req.query
		};

		const [newParamsType, newCategoryParams] = [
			replaceControllerParamType(params.type, 'other', 'everything_else'),
			replaceControllerParamType(params.category, 'Application Document', developersApplication)
		];

		if (newParamsType) {
			params.type = newParamsType ?? [];
		}

		if (newCategoryParams) {
			params.category = newCategoryParams ?? [];
		}

		const { searchTerm, stage, type, category } = req.query;

		const categoryList = category === developersApplication ? 'Application Document' : category;

		let examinationLibraryResponse = null;

		if (params.page === '1' && !searchTerm) {
			examinationLibraryResponse = await searchDocumentsV2({
				...params,
				searchTerm: documentExaminationLibraryId
			});
		}

		const response = await searchDocumentsV2(params);

		const pageDataObj = pageData(params, response, applicationResponse);
		const pageFeatureToggles = featureToggles();
		const pageDocuments = handleDocuments(response, examinationLibraryResponse);
		const pageObjectFilters = handleFilters(response, stage, type, categoryList);

		res.render(VIEW.PROJECTS.DOCUMENTS, {
			...pageDocuments,
			...pageFeatureToggles,
			...pageDataObj,
			...pageObjectFilters,
			projectName,
			searchTerm: params.searchTerm
		});
	}
};
