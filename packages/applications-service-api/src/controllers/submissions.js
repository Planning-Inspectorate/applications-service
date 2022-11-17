const { StatusCodes } = require('http-status-codes');
const { createSubmission, completeSubmission} = require('../services/submission.service');
const { submitUserUploadedFile, submitRepresentationFile } = require('../services/ni.file.service');

const createSubmissionController = async (req, res) => {
	const { caseReference } = req.params;

	const submissionRequestData = buildSubmissionData(req.body, caseReference);
	let submission = await createSubmission(submissionRequestData);

	if (req.file) {
		submission = await submitUserUploadedFile(submission, req.file);
	}

	if (submission.representation) {
		await submitRepresentationFile(submission);
	}

	return res.status(StatusCodes.CREATED).send(submission);
};

const completeSubmissionController = async (req, res) => {
	await completeSubmission(req.params.submissionId);
	return res.sendStatus(StatusCodes.NO_CONTENT);
};

const buildSubmissionData = (requestBody, caseReference) => {
	return {
		name: requestBody.name,
		email: requestBody.email,
		interestedParty: requestBody.interestedParty,
		ipReference: requestBody.ipReference,
		deadline: requestBody.deadline,
		submissionType: requestBody.submissionType,
		sensitiveData: requestBody.sensitiveData,
		lateSubmission: requestBody.lateSubmission,
		submissionId: requestBody.submissionId,
		representation: requestBody.representation,
		caseReference: caseReference,
		dateSubmitted: new Date()
	};
};

module.exports = {
	createSubmission: createSubmissionController,
	completeSubmission: completeSubmissionController
};
