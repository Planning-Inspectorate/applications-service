const Path = require('path');
const { uploadFile } = require('./ni.api.service');
const { updateSubmission } = require('./submission.service');
const { md5 } = require('../utils/md5');
const { textToPdf } = require('../utils/pdf');

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
	const fileData = generateRepresentationPDF(submission.submissionId, submission.representation, fileName);

	return submitFile(submission, fileData);
};

const submitFile = async (submission, fileData) => {
	await uploadFile(fileData);

	await updateSubmission({
		id: submission.id,
		file: fileData
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

module.exports = {
	submitUserUploadedFile,
	submitRepresentationFile
};
