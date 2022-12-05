const { replaceControllerParamType } = require('../../../../utils/replace-controller-param-type');
const { searchDocumentsV2 } = require('../../../../services/document.service');
const documentExaminationLibraryId = 'examination library';
const developersApplication = "Developer's Application";
const handleParams = async (recivedParams, recievdQuery, searchTerm) => {
	const params = {
		caseRef: recivedParams.case_ref,
		classification: 'all',
		page: '1',
		...recievdQuery.query
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

	let examinationLibraryResponse = null;

	if (params.page === '1' && !searchTerm) {
		examinationLibraryResponse = await searchDocumentsV2({
			...params,
			searchTerm: documentExaminationLibraryId
		});
	}

	return {
		params,
		examinationLibraryResponse
	};
};

module.exports = {
	handleParams
};
