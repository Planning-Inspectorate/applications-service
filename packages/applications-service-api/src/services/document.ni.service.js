const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const { fetchDocuments, getAvailableFilters } = require('../repositories/document.ni.repository');

const fetchNIDocuments = async (requestQuery) => {
	const documents = await fetchDocuments(requestQuery);
	return {
		count: documents.count,
		data: mapDocuments(documents.rows)
	};
};

const fetchNIDocumentFilters = async (caseReference) => {
	const availableFilters = await getAvailableFilters(caseReference);
	return mapFilters(availableFilters);
};

module.exports = {
	fetchNIDocuments,
	fetchNIDocumentFilters
};
