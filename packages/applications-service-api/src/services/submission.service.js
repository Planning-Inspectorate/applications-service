const ApiError = require('../error/apiError');
const { createNISubmission, completeNISubmission } = require('./submission.ni.service');
const { publishDeadlineSubmission } = require('./backoffice.publish.service');
const { generateRepresentationPDF, uploadSubmissionFileToBlobStorage } = require('../utils/file');
const { getApplication } = require('./application.backoffice.service');
const { sendSubmissionNotification } = require('../lib/notify');
const { generateId } = require('../utils/generate-id');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const createSubmission = async (submission) =>
	isBackOfficeCaseReference(submission.metadata.caseReference)
		? createBackOfficeSubmission(submission)
		: createNISubmission(submission);

const completeSubmission = async (submissionDetails) =>
	isBackOfficeCaseReference(submissionDetails.caseReference)
		? completeBackOfficeSubmission(submissionDetails)
		: completeNISubmission(submissionDetails.submissionId);

const createBackOfficeSubmission = async (submission) => {
	const { metadata } = submission;

	if (!metadata.submissionId) metadata.submissionId = generateId('S');

	if (metadata.representation) {
		submission.file = generateRepresentationPDF(
			metadata.submissionId,
			metadata.representation,
			'Written-Representation.pdf'
		);
	}

	const blobGuid = await uploadSubmissionFileToBlobStorage(submission.file);
	await publishDeadlineSubmission(submission, blobGuid);

	return {
		submissionId: metadata.submissionId
	};
};

const completeBackOfficeSubmission = async (submissionDetails) => {
	const { submissionId, caseReference, email } = submissionDetails;

	const application = await getApplication(caseReference);
	if (!application)
		throw ApiError.notFound(`Project with case reference ${caseReference} not found`);

	await sendSubmissionNotification({
		submissionId: submissionId,
		email: email,
		project: {
			name: application.projectName,
			email: application.projectEmailAddress
		}
	});
};

module.exports = {
	createSubmission,
	completeSubmission
};
