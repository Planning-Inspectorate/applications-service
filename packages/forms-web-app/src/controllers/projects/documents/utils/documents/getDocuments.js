const { mapDocumentsToViewModel } = require('./documents-view-model');
const { getExaminationLibraryDocumentHtml } = require('./get-examination-library-document-html');

const getDocuments = (documents, examinationLibraryDocument) => ({
	documents: mapDocumentsToViewModel(documents),
	examinationLibraryDocumentHtml: getExaminationLibraryDocumentHtml(examinationLibraryDocument)
});

module.exports = {
	getDocuments
};
