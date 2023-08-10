const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const {
	fetchDocuments,
	getAvailableFilters,
	fetchDocumentsByDocumentType
} = require('../repositories/document.ni.repository');

const fetchNIDocuments = async (requestQuery) => {
	const documents = await fetchDocuments(requestQuery);
	return {
		count: documents.count,
		data: mapDocuments(documents.rows)
	};
};

const fetchNIDocumentsByType = async (requestQuery) => {
	const { dataValues } = await fetchDocumentsByDocumentType(requestQuery);

	return {
		data: dataValues
	};
};

const fetchNIDocumentFilters = async (caseReference) => {
	const availableFilters = await getAvailableFilters(caseReference);
	return mapFilters(availableFilters);
};

module.exports = {
	fetchNIDocuments,
	fetchNIDocumentFilters,
	fetchNIDocumentsByType
};
