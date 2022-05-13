/* eslint-disable camelcase */
const { searchDocumentList, searchDocumentListV2 } = require('../lib/application-api-wrapper');

const searchDocument = async (case_ref, search_data) => {
  return searchDocumentList(case_ref, search_data);
};

const searchDocumentsV2 = async (params) => {
  return searchDocumentListV2(params);
};

module.exports = {
  searchDocument,
  searchDocumentsV2,
};
