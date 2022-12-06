const { formatDate } = require('../../../../utils/date-utils');
const { documentExaminationLibraryId } = require('./config');

const formatDatesForDocuments = (documents) => {
	const formattedDocuments = [...documents];
	if (formattedDocuments.length) {
		formattedDocuments.forEach(
			(document) => (document.date_published = formatDate(document.date_published))
		);
	}

	return formattedDocuments;
};

const doesExaminationLibraryResponseHaveExaminationDocument = (documents) => {
	const examinationLibraryDocuments = [...documents];
	let documentExaminationLibraryIndex = null;
	for (let i = 0; i < examinationLibraryDocuments.length; i++) {
		const document = examinationLibraryDocuments[i];
		const documentType = typeof document.type === 'string' ? document.type.toLowerCase() : '';

		if (documentType === documentExaminationLibraryId) {
			documentExaminationLibraryIndex = i;
			break;
		}
	}
	return documentExaminationLibraryIndex;
};
const handleDocuments = (searchDocuments, examinationLibraryResponse) => {
	const { documents } = searchDocuments.data;

	if (documents.length && examinationLibraryResponse) {
		const documentExaminationLibraryIndex =
			doesExaminationLibraryResponseHaveExaminationDocument(documents);

		if (documentExaminationLibraryIndex !== null) {
			const documentElement = documents.splice(documentExaminationLibraryIndex, 1)[0];
			documents.splice(0, 0, documentElement);
		} else {
			const examinationLibraryDocuments = examinationLibraryResponse?.data?.documents;

			if (
				examinationLibraryDocuments &&
				Array.isArray(examinationLibraryDocuments) &&
				examinationLibraryDocuments.length
			) {
				const findExaminationLibraryDocumentType = examinationLibraryDocuments.find(
					(examinationLibraryDocument) => {
						const examinationLibraryDocumentType =
							typeof examinationLibraryDocument.type === 'string'
								? examinationLibraryDocument.type.toLowerCase()
								: '';
						return examinationLibraryDocumentType === documentExaminationLibraryId;
					}
				);

				if (findExaminationLibraryDocumentType) {
					documents.unshift(findExaminationLibraryDocumentType);
				}
			}
		}
	}

	const dateFormattedDocuments = formatDatesForDocuments(documents);

	return {
		documents: dateFormattedDocuments
	};
};

module.exports = {
	handleDocuments
};
