const Path = require('path');
const { uploadFile } = require('./ni.api.service');
const { updateSubmission } = require('./submission.service');

const submitFile = async (submission, file) => {
	const fileSequenceNumber = submission.id - submission.submissionId + 1;
	const fileName = buildFileName(file.originalName, submission.submissionId, fileSequenceNumber);
	const fileData = {
		name: fileName,
		...file
	};

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

const buildFileName = (fileName, submissionId, sequenceNumber) => {
	const parsedName = Path.parse(fileName);
	return `${parsedName.name}-${submissionId}-${sequenceNumber}${parsedName.ext}`;
};

module.exports = {
	submitFile
};
