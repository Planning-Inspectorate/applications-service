const { StatusCodes } = require('http-status-codes');
const { createSubmission, completeSubmission } = require('../services/submission.service');
const { getDate } = require('../utils/date-utils');

const createSubmissionController = async (req, res) => {
	const { caseReference } = req.params;

	const submissionRequestData = buildSubmissionData(caseReference, req.body, req.file);
	const { submissionId } = await createSubmission(submissionRequestData);

	return res.status(StatusCodes.CREATED).send({ submissionId });
};

const completeSubmissionController = async (req, res) => {
	await completeSubmission(req.params.submissionId);
	return res.sendStatus(StatusCodes.NO_CONTENT);
};

const buildSubmissionData = (caseReference, requestBody, file) => ({
	metadata: {
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
		dateSubmitted: getDate()
	},
	file
});

module.exports = {
	createSubmission: createSubmissionController,
	completeSubmission: completeSubmissionController
};
