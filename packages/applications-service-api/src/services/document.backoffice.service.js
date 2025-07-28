const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../repositories/document.backoffice.repository');
const { mapFilters, mapBackOfficeDocuments } = require('../utils/document.mapper');
const { documentTypeDictionary } = require('@pins/common/src/constants');

const fetchBackOfficeDocuments = async (filters, isMaterialChange) => {
	const docs = await getDocuments(filters);
	return {
		count: docs.count,
		data: mapBackOfficeDocuments(docs.rows, isMaterialChange)
	};
};

const fetchBackOfficeDocumentsByType = async ({ caseReference, type }) => {
	const document = await getDocumentsByType({
		caseReference,
		type: documentTypeDictionary[type.toUpperCase()].bo
	});

	let data;
	if (document) [data] = mapBackOfficeDocuments([document]);

	return {
		data
	};
};

const fetchBackOfficeDocumentFilters = async (caseReference, isMaterialChange) => {
	const availableFilters = await getFilters(caseReference);
	return mapFilters(availableFilters, isMaterialChange);
};

module.exports = {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters,
	fetchBackOfficeDocumentsByType
};
