const { mapDocumentsToViewModel } = require('./documents-view-model');
const { getExaminationLibraryDocumentHtml } = require('./get-examination-library-document-html');

const getDocuments = (i18n, documents, examinationLibraryDocument) => ({
	documents: mapDocumentsToViewModel(i18n, documents),
	examinationLibraryDocumentHtml: getExaminationLibraryDocumentHtml(
		i18n,
		examinationLibraryDocument
	)
});

module.exports = {
	getDocuments
};
