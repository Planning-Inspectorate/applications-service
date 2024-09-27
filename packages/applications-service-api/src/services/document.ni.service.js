const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const {
	fetchDocuments,
	getAvailableFilters,
	fetchDocumentsByDocumentType
} = require('../repositories/document.ni.repository');
const { documentTypeDictionary } = require('@pins/common/src/constants');

const fetchNIDocuments = async (requestQuery) => {
	const documents = await fetchDocuments(requestQuery);
	return {
		count: documents.count,
		data: mapDocuments(documents.rows)
	};
};

const fetchNIDocumentsByType = async ({ caseReference, type }) => {
	const response = await fetchDocumentsByDocumentType({
		caseReference,
		type: documentTypeDictionary[type.toUpperCase()].ni
	});

	let data;
	if (response?.dataValues) [data] = mapDocuments([response.dataValues]);

	return {
		data
	};
};

const fetchNIDocumentFilters = async (caseReference, isMaterialChange) => {
	const availableFilters = await getAvailableFilters(caseReference);
	return mapFilters(availableFilters, isMaterialChange);
};

module.exports = {
	fetchNIDocuments,
	fetchNIDocumentFilters,
	fetchNIDocumentsByType
};
