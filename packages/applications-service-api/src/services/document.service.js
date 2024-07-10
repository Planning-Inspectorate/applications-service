const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../repositories/document.repository');
const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const { documentTypeDictionary } = require('@pins/common/src/constants');

const fetchDocuments = async (filters) => {
	const docs = await getDocuments(filters);
	return {
		count: docs.count,
		data: mapDocuments(docs.rows)
	};
};

const fetchDocumentsByType = async ({ caseReference, type }) => {
	const document = await getDocumentsByType({
		caseReference,
		type: documentTypeDictionary[type.toUpperCase()].bo
	});

	let data;
	if (document) [data] = mapDocuments([document]);

	return {
		data
	};
};

const fetchDocumentFilters = async (caseReference) => {
	const availableFilters = await getFilters(caseReference);
	return mapFilters(availableFilters);
};

module.exports = {
	fetchDocuments,
	fetchDocumentsByType,
	fetchDocumentFilters
};
