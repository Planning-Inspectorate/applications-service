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
	const path = `${blobGuid}/1`;

	logger.info(`Uploading file to blob storage at path ${path}`);
	await upload(file.buffer, file.mimeType, path);

	return blobGuid;
};

module.exports = { generateRepresentationPDF, uploadSubmissionFileToBlobStorage };
