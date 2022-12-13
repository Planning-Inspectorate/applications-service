const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { getBody } = require('./body/getBody');
const {
	documentsWithExaminationLibraryAtTheTop
} = require('./documents-with-examination-library-at-the-top');
const { isTheFirstPage } = require('./body/isTheFirstPage');

const searchDocuments = async (case_ref, query) => {
	const body = getBody(case_ref, query);

	const { data } = await searchDocumentsV3(body);

	let documents = [];

	if (isTheFirstPage(query)) {
		documents = await documentsWithExaminationLibraryAtTheTop(body, data.documents);
	} else {
		documents = data.documents;
	}

	return {
		documents,
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
