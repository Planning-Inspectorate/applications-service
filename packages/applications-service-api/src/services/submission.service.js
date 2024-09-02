const ApiError = require('../error/apiError');
const { createNISubmission, completeNISubmission } = require('./submission.ni.service');
const { publishDeadlineSubmission } = require('./backoffice.publish.service');
const { generateRepresentationPDF, uploadSubmissionFileToBlobStorage } = require('../utils/file');
const { getApplication } = require('./application.backoffice.service');
const { sendSubmissionNotification } = require('../lib/notify');
const { generateId } = require('../utils/generate-id');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const { isProjectRegionWales } = require('../utils/is-project-region-wales');
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
		const fileName = buildRepresentationFileName(metadata);
		submission.file = generateRepresentationPDF(
			metadata.submissionId,
			metadata.representation,
			fileName
		);
	}

	const blobGuid = await uploadSubmissionFileToBlobStorage(submission.file);
	await publishDeadlineSubmission(submission, blobGuid);

	return {
		submissionId: metadata.submissionId
	};
};

const buildRepresentationFileName = (metadata) =>
	`${metadata.name.replace(/\s+/g, '-')}-Written-Representation.pdf`;

const completeBackOfficeSubmission = async (submissionDetails) => {
	const { submissionId, caseReference, email } = submissionDetails;

	const application = await getApplication(caseReference);
	if (!application)
		throw ApiError.notFound(`Project with case reference ${caseReference} not found`);

	const details = {
		submissionId: submissionId,
		email: email,
		project: {
			name: application.projectName,
			email: application.projectEmailAddress,
			...(isProjectRegionWales(application.regions) && {
				welshName: application.projectNameWelsh || application.projectName
			})
		}
	};

	await sendSubmissionNotification(details);
};

module.exports = {
	createSubmission,
	completeSubmission
};
