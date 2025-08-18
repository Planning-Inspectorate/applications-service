const uuid = require('uuid');
const logger = require('../lib/logger');
const { textToPdf } = require('./pdf');
const { md5 } = require('./md5');
const { upload } = require('../lib/blobStorage');

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

const uploadSubmissionFileToBlobStorage = async (file) => {
	const blobGuid = uuid.v4();
	//to avoid issues with the blob storage urls not handling special characters, we use a fixed blob name to mitigate that,
	//The file name is saved separately in the metadata and the blob name is only used programmatically to retrieve/copy the file.
	const path = `${blobGuid}/1`;

	logger.info(`Uploading file to blob storage at path ${path}`);
	await upload(file.buffer, file.mimeType, path);

	return blobGuid;
};

module.exports = { generateRepresentationPDF, uploadSubmissionFileToBlobStorage };
