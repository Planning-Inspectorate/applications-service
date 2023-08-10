const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const {
	fetchDocuments,
	getAvailableFilters,
	fetchDocumentsByDocumentType
} = require('../repositories/document.ni.repository');
const { documentTypeDict } = require('../docType');

const fetchNIDocuments = async (requestQuery) => {
	const documents = await fetchDocuments(requestQuery);
	return {
		count: documents.count,
		data: mapDocuments(documents.rows)
	};
};

const fetchNIDocumentsByType = async ({ caseReference, type }) => {
	const { dataValues } = await fetchDocumentsByDocumentType({
		caseReference,
		type: documentTypeDict[type.toUpperCase()].ni
	});
	const [data] = mapDocuments([dataValues]);

	return {
		data
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
