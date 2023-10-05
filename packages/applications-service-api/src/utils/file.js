const { textToPdf } = require('./pdf');
const { md5 } = require('./md5');
const uuid = require('uuid');

const generateRepresentationPDF = (submissionId, submissionRepresentation, fileName) => {
	const file = textToPdf(`Submission ID: ${submissionId}\n\n${submissionRepresentation}`);

	return {
		name: fileName,
		originalName: fileName,
		buffer: file,
		size: file.byteLength,
		md5: md5(file),
		mimeType: 'application/pdf'
	};
};

// TODO: ASB-1830 - upload file data, return guid
const uploadToBlobStorage = async (file) => {
	const blobGuid = uuid.v4();
	const path = `${blobGuid}/${file.originalName}`;
	console.log(`Not Implemented: Upload file to blob at ${path}`);
	return blobGuid;
};

module.exports = { generateRepresentationPDF, uploadToBlobStorage };
