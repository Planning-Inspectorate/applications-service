const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../repositories/document.backoffice.repository');
const { mapFilters, mapBackOfficeDocuments } = require('../utils/document.mapper');
const { documentTypeDict } = require('../docType');

const fetchBackOfficeDocuments = async (filters) => {
	const docs = await getDocuments(filters);
	return {
		count: docs.count,
		data: mapBackOfficeDocuments(docs.rows)
	};
};

const fetchBackOfficeDocumentsByType = async ({ caseReference, type }) => {
	const document = await getDocumentsByType({
		caseReference,
		type: documentTypeDict[type.toUpperCase()].bo
	});

	const [data] = mapBackOfficeDocuments([document]);
	return {
		data
	};
};

const fetchBackOfficeDocumentFilters = async (caseReference) => {
	const availableFilters = await getFilters(caseReference);
	return mapFilters(availableFilters);
};

module.exports = {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters,
	fetchBackOfficeDocumentsByType
};
