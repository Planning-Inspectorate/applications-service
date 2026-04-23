const {
	getDocuments,
	getFilters,
	getDocumentsByType,
	getDocumentByDocRef
} = require('../repositories/document.repository');
const { mapFilters, mapDocuments } = require('../utils/document.mapper');
const { documentTypeDictionary } = require('@pins/common/src/constants');

const fetchDocuments = async (filters, isMaterialChange) => {
	const docs = await getDocuments(filters);
	return {
		count: docs.count,
		data: mapDocuments(docs.rows, isMaterialChange)
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

const fetchDocumentFilters = async (caseReference, isMaterialChange) => {
	const availableFilters = await getFilters(caseReference);
	return mapFilters(availableFilters, isMaterialChange);
};

const fetchDocumentByDocRef = async (docRef) => {
	const document = await getDocumentByDocRef(docRef);
	return mapDocuments([document]);
};

module.exports = {
	fetchDocuments,
	fetchDocumentsByType,
	fetchDocumentFilters,
	fetchDocumentByDocRef
};
