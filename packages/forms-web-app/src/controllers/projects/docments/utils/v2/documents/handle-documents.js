const {
	doesExaminationLibraryResponseHaveExaminationDocument,
	putExamintionLibraryAtTheTopOfTheArray,
	handleElse,
	formatDatesForDocuments
} = require('./helpers');

const handleDocuments = (searchDocuments, examinationLibraryResponse) => {
	const { documents } = searchDocuments.data;

	let localDocs = [...documents];

	if (documents.length && examinationLibraryResponse) {
		const documentExaminationLibraryIndex =
			doesExaminationLibraryResponseHaveExaminationDocument(localDocs);
		localDocs =
			documentExaminationLibraryIndex !== null
				? putExamintionLibraryAtTheTopOfTheArray(documents, documentExaminationLibraryIndex)
				: handleElse(documents, examinationLibraryResponse);
	}

	const dateFormattedDocuments = formatDatesForDocuments(localDocs);

	return {
		documents: dateFormattedDocuments
	};
};

module.exports = {
	handleDocuments
};
