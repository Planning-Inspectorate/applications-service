const { searchDocumentsV3 } = require('../../../../../services/document.service');

const examinationLibraryDocumentSearchTerm = 'examination library';

const searchExaminationLibraryDocument = async (body) => {
	const localBody = JSON.parse(JSON.stringify(body));
	localBody.searchTerm = examinationLibraryDocumentSearchTerm;
	const { data } = await searchDocumentsV3(localBody);
	return data?.documents[0];
};

module.exports = { searchExaminationLibraryDocument };
