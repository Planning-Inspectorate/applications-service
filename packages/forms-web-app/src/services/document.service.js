const { searchDocumentList } = require('../lib/document-api-wrapper');

const searchDocument = async (case_ref, search_data) => {
    const documentList = await searchDocumentList(case_ref, search_data);
    return documentList;
}

module.exports = {
    searchDocument,
};