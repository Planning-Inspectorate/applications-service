const { searchDocumentsV2 } = require('../../../../../services/document.service');
const getExaminationLibraryDocuments = async (params, searchTerm) =>
	params.page === '1' && !searchTerm
		? await searchDocumentsV2({
				...params,
				searchTerm: 'examination library'
		  })
		: null;

module.exports = {
	getExaminationLibraryDocuments
};
