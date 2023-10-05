const { StatusCodes } = require('http-status-codes');
const { createSubmission, completeSubmission } = require('../services/submission.service');
const { getDate } = require('../utils/date-utils');

const createSubmissionController = async (req, res) => {
	const submissionRequestData = buildSubmissionData(req);
	const { submissionId } = await createSubmission(submissionRequestData);

	return res.status(StatusCodes.CREATED).send({ submissionId });
};

const completeSubmissionController = async (req, res) => {
	await completeSubmission(req.params.submissionId);
	return res.sendStatus(StatusCodes.NO_CONTENT);
};

const buildSubmissionData = (request) => {
	const { params, body, file } = request;
	return {
		metadata: {
			name: body.name,
			email: body.email,
			interestedParty: body.interestedParty,
			ipReference: body.ipReference,
			deadline: body.deadline,
			submissionType: body.submissionType,
			sensitiveData: body.sensitiveData,
			lateSubmission: body.lateSubmission,
			submissionId: body.submissionId,
			representation: body.representation,
			caseReference: params.caseReference,
			dateSubmitted: getDate()
		},
		file
	};
};

module.exports = {
	createSubmission: createSubmissionController,
	completeSubmission: completeSubmissionController
};
