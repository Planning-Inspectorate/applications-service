const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { mapDocumentsToViewModel } = require('./documents-view-model');
const { mapQueryToFilterBody } = require('./mapQueryToFilterBody');

const getDocuments = async (case_ref, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const filterBody = mapQueryToFilterBody(localQuery);
	const body = {
		caseReference: case_ref,
		filters: filterBody
	};

	const { data } = await searchDocumentsV3(body);

	console.log('Data:', data);
	return {
		documents: mapDocumentsToViewModel(data.documents),
		filters: data.filters
	};
};

module.exports = {
	getDocuments
};
