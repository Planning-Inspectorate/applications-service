const { wrappedSearchDocumentsV3 } = require('../../../../../lib/application-api-wrapper');
const { getBody } = require('./body/getBody');
const { searchExaminationLibraryDocument } = require('./search-examination-library-document');

const searchDocuments = async (case_ref, query) => {
	const body = getBody(case_ref, query);
	const { data } = await wrappedSearchDocumentsV3(body);
	const examinationLibraryDocument = await searchExaminationLibraryDocument(case_ref);

	return {
		documents: data.documents,
		examinationLibraryDocument,
		filters: data.filters,
		pagination: {
			totalItems: data.totalItems,
			itemsPerPage: data.itemsPerPage,
			totalPages: data.totalPages,
			currentPage: data.currentPage
		}
	};
};

module.exports = {
	searchDocuments
};
