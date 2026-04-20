const ApiError = require('../error/apiError');
const { publishDeadlineSubmission } = require('./publish.service');
const { generateRepresentationPDF, uploadSubmissionFileToBlobStorage } = require('../utils/file');
const { getApplication } = require('./application.service');
const { sendSubmissionNotification } = require('../lib/notify');
const { generateId } = require('../utils/generate-id');
const { isProjectRegionWales } = require('../utils/is-project-region-wales');

const createSubmission = async (submission) => {
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
	`${metadata.name.replace(/\s+/g, '-')}-${metadata.submissionType.replace(/\s+/g, '-')}-${
		metadata.submissionId
	}.pdf`;

const completeSubmission = async (submissionDetails) => {
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
