const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { getBody } = require('./body/getBody');

const examinationLibraryDocumentSearchTerm = 'examination library';

const searchExaminationLibraryDocument = async (case_ref) => {
	const examinationLibraryDocumentBody = getBody(case_ref, {
		searchTerm: examinationLibraryDocumentSearchTerm
	});
	const { data } = await searchDocumentsV3(examinationLibraryDocumentBody);
	return data?.documents[0];
};

module.exports = { searchExaminationLibraryDocument };
