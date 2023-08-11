/* eslint-disable camelcase */
const {
	searchDocumentList,
	searchDocumentListV2,
	wrappedSearchDocumentsV3,
	getDocumentByType
} = require('../lib/application-api-wrapper');

const searchDocument = async (case_ref, search_data) => {
	return searchDocumentList(case_ref, search_data);
};

const getDocumentType = async (case_ref, type) => {
	return getDocumentByType(case_ref, type);
};

const searchDocumentsV2 = async (params) => {
	return searchDocumentListV2(params);
};

const searchDocumentsV3 = async (body) => wrappedSearchDocumentsV3(body);

module.exports = {
	searchDocument,
	searchDocumentsV2,
	searchDocumentsV3,
	getDocumentType
};
