const { getDocuments, getFilters } = require('../repositories/document.backoffice.repository');
const { mapFilters, mapBackOfficeDocuments } = require('../utils/document.mapper');

const fetchBackOfficeDocuments = async (filters) => {
	const docs = await getDocuments(filters);
	return {
		count: docs.count,
		data: mapBackOfficeDocuments(docs.rows)
	};
};

const fetchBackOfficeDocumentFilters = async (caseReference) => {
	const availableFilters = await getFilters(caseReference);
	return mapFilters(availableFilters);
};

module.exports = {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters
};
