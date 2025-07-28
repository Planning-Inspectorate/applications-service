const { wrappedSearchDocumentsV3 } = require('../../../../../lib/application-api-wrapper');
const { getBody } = require('./body/getBody');

const searchDocuments = async (case_ref, query) => {
	const body = getBody(case_ref, query);
	const { data } = await wrappedSearchDocumentsV3(body);

	return {
		documents: data.documents,
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
