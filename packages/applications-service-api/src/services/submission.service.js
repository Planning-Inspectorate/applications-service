const ApiError = require('../error/apiError');
const { publishDeadlineSubmission } = require('./publish.service');
const { generateRepresentationPDF, uploadSubmissionFileToBlobStorage } = require('../utils/file');
const { getApplication } = require('./application.service');
const { sendSubmissionNotification } = require('../lib/notify');
const { generateId } = require('../utils/generate-id');
const createSubmission = async (submission) => {
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

const completeSubmission = async (submissionDetails) => {
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
