const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { mapDocumentsToViewModel } = require('./documents-view-model');
const { getBody } = require('./body/getBody');

const getDocuments = async (case_ref, query) => {
	const body = getBody(case_ref, query);
	const { data } = await searchDocumentsV3(body);

	return {
		documents: mapDocumentsToViewModel(data.documents),
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
	getDocuments
};
