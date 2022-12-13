const { searchDocumentsV3 } = require('../../../../../services/document.service');

const key = 'examination library';

const addExaminationLibraryToTheTop = (rawDocs, data) => [
	data.documents[0],
	...rawDocs.filter((document) => document.type.toLowerCase() !== key)
];

const documentsWithExaminationLibraryAtTheTop = async (body, rawDocs) => {
	const localBody = JSON.parse(JSON.stringify(body));
	localBody.searchTerm = key;
	const { data } = await searchDocumentsV3(localBody);

	return data.documents.length > 0 ? addExaminationLibraryToTheTop(rawDocs, data) : rawDocs;
};

module.exports = {
	documentsWithExaminationLibraryAtTheTop
};
