const Path = require('path');
const { uploadFile } = require('./ni.api.service');
const {
	updateSubmission: updateSubmissionRepository
} = require('../repositories/submission.ni.repository');
const { generateRepresentationPDF } = require('../utils/file');

const submitUserUploadedFile = async (submission, file) => {
	const fileName = buildFileName(file.originalName, submission);
	const fileData = {
		name: fileName,
		...file
	};

	return submitFile(submission, fileData);
};

const submitRepresentationFile = async (submission) => {
	const fileName = buildRepresentationFileName(submission);
	const fileData = generateRepresentationPDF(
		submission.submissionId,
		submission.representation,
		fileName
	);

	return submitFile(submission, fileData);
};

const submitFile = async (submission, fileData) => {
	await uploadFile(fileData);

	await updateSubmissionRepository(submission.id, {
		filenameOriginal: fileData.originalName,
		filename: fileData.name,
		fileSize: fileData.size,
		fileMD5: fileData.md5
	});

	return {
		...submission,
		file: {
			name: fileData.name,
			originalName: fileData.originalName,
			size: fileData.size,
			md5: fileData.md5
		}
	};
};

const buildFileName = (fileName, submission) => {
	const sequenceNumber = submission.id - submission.submissionId + 1;
	const parsedName = Path.parse(fileName);
	return `${parsedName.name}-${submission.submissionId}-${sequenceNumber}${parsedName.ext}`;
};

const buildRepresentationFileName = (submission) =>
	buildFileName(`${submission.name.replace(/\s+/g, '-')}-Written-Representation.pdf`, submission);

module.exports = {
	submitUserUploadedFile,
	submitRepresentationFile
};
