const md5 = require('md5');
const Path = require('path');
const { StatusCodes } = require('http-status-codes');
const { createSubmission, updateSubmission } = require('../services/submission.service');
const { uploadFile } = require('../services/ni.api.service');

module.exports = {
	async createSubmission(req, res) {
		if (!req.body.representation && !req.file) {
			return res.status(StatusCodes.BAD_REQUEST).send({
				code: StatusCodes.BAD_REQUEST,
				errors: ["Missing property 'representation' or 'file'"]
			});
		}

		const { caseReference } = req.params;

		const submissionRequestData = buildSubmissionData(req.body, caseReference);
		let submission = await createSubmission(submissionRequestData);

		if (req.file) {
			submission = await submitFile(submission, req.file);
		}

		return res.status(StatusCodes.CREATED).send(submission);
	}
};

const submitFile = async (submission, file) => {
	const fileSequenceNumber = submission.id - submission.submissionId + 1;
	const fileName = buildFileName(file.originalname, submission.submissionId, fileSequenceNumber);
	const fileData = {
		name: fileName,
		originalName: file.originalname,
		size: file.size,
		md5: md5(file.buffer)
	};

	await uploadFile({
		buffer: file.buffer,
		fileName: fileName,
		mimeType: file.mimetype,
		size: file.size
	});

	await updateSubmission({
		id: submission.id,
		file: fileData
	});

	return {
		...submission,
		file: fileData
	};
};

const buildSubmissionData = (requestBody, caseReference) => {
	return {
		name: requestBody.name,
		email: requestBody.email,
		interestedParty: parseBoolean(requestBody.interestedParty),
		ipReference: requestBody.ipReference,
		deadline: requestBody.deadline,
		submissionType: requestBody.submissionType,
		sensitiveData: parseBoolean(requestBody.sensitiveData),
		lateSubmission: parseBoolean(requestBody.lateSubmission),
		submissionId: parseInteger(requestBody.submissionId),
		caseReference: caseReference,
		dateSubmitted: new Date(),
		representation: requestBody.representation
	};
};

const buildFileName = (fileName, submissionId, sequenceNumber) => {
	const parsedName = Path.parse(fileName);
	return `${parsedName.name}-${submissionId}-${sequenceNumber}${parsedName.ext}`;
};

const parseBoolean = (str) => {
	try {
		return typeof str === 'string' ? JSON.parse(str.toLowerCase()) : null;
	} catch {
		return null;
	}
};

const parseInteger = (str) => {
	const i = parseInt(str);
	return isNaN(i) ? null : i;
};
