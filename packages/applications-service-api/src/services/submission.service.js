const config = require('../lib/config');

const { createNISubmission, completeNISubmission } = require('./submission.ni.service');

const createSubmission = async (submission) =>
	isBackOfficeSubmission(submission.metadata.caseReference)
		? createBackOfficeSubmission(submission)
		: createNISubmission(submission);

const completeSubmission = async (submissionId) => completeNISubmission(submissionId);

const createBackOfficeSubmission = async (submission) => {
	console.log(submission);
	throw 'Not Implemented';
};

const isBackOfficeSubmission = (caseReference) =>
	config.backOfficeIntegration.submissions.postSubmission.caseReferences.includes(caseReference);

module.exports = {
	createSubmission,
	completeSubmission
};
