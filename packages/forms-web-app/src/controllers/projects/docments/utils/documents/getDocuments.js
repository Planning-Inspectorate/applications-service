const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { mapDocumentsToViewModel } = require('./documents-view-model');

const getDocuments = async (case_ref) => {
	const body = {
		caseReference: case_ref
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
