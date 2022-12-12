const { mapDocumentsToViewModel } = require('./documents-view-model');

const getDocuments = (documents) => mapDocumentsToViewModel(documents);

module.exports = {
	getDocuments
};
