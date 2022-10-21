const { StatusCodes } = require('http-status-codes');
const { createSubmission } = require('../services/submission.service');
const { submitFile } = require('../services/ni.file.service');

module.exports = {
	async createSubmission(req, res) {
		const { caseReference } = req.params;

		const submissionRequestData = buildSubmissionData(req.body, caseReference);
		let submission = await createSubmission(submissionRequestData);

		if (req.file) {
			submission = await submitFile(submission, req.file);
		}

		return res.status(StatusCodes.CREATED).send(submission);
	}
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
