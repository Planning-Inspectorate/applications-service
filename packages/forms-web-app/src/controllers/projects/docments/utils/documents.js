const { formatDate } = require('../../../../utils/date-utils');
const handleDocuments = (response, examinationLibraryResponse) => {
	const respData = response.data;
	const { documents } = respData;

	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;

	if (documents.length && examinationLibraryResponse) {
		for (let i = 0; i < documents.length; i++) {
			const document = documents[i];
			const documentType = typeof document.type === 'string' ? document.type.toLowerCase() : '';

			if (documentType === documentExaminationLibraryId) {
				documentExaminationLibraryIndex = i;
				break;
			}
		}

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

	if (documents.length) {
		documents.forEach(
			(document) => (document.date_published = formatDate(document.date_published))
		);
	}

	return {
		documents
	};
};

module.exports = {
	handleDocuments
};
