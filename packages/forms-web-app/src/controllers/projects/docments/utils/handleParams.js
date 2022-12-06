const { replaceControllerParamType } = require('../../../../utils/replace-controller-param-type');
const { searchDocumentsV2 } = require('../../../../services/document.service');
const handleParams = (paramsType, expectedParam, newParamType) =>
	replaceControllerParamType(paramsType, expectedParam, newParamType) ?? [];

const getExaminationLibraryDocuments = async (params, searchTerm) =>
	params.page === '1' && !searchTerm
		? await searchDocumentsV2({
				...params,
				searchTerm: 'examination library'
		  })
		: null;

module.exports = {
	handleParams,
	getExaminationLibraryDocuments
};
