const ApiError = require('../error/apiError');
const { sendSubmissionNotification } = require('../lib/notify');
const { getNIApplication } = require('./application.ni.service');
const { submitUserUploadedFile, submitRepresentationFile } = require('./ni.file.service');
const {
	getSubmission: getSubmissionRepository,
	createSubmission: createSubmissionRepository,
	updateSubmission: updateSubmissionRepository,
	updateSubmissionsBySubmissionId: updateSubmissionsBySubmissionIdRepository
} = require('../repositories/submission.ni.repository');

const PLACEHOLDER_SUBMISSION_ID = 0;

const createNISubmission = async (submissionData) => {
	const submission = await createSubmission(submissionData.metadata);

	if (submissionData.file) {
		await submitUserUploadedFile(submission, submissionData.file);
	}

	if (submission.representation) {
		await submitRepresentationFile(submission);
	}

	return {
		submissionId: submission.submissionId
	};
};

const createSubmission = async (submission) => {
	try {
		const submissionId = submission.submissionId || PLACEHOLDER_SUBMISSION_ID;

		const dbSubmission = await createSubmissionRepository({
			name: submission.name,
			email: submission.email,
			interestedParty: submission.interestedParty,
			iPReference: submission.ipReference,
			deadline: submission.deadline,
			submissionType: submission.submissionType,
			sensitiveData: submission.sensitiveData,
			lateSubmission: submission.lateSubmission,
			caseReference: submission.caseReference,
			dateSubmitted: submission.dateSubmitted,
			submissionId: submissionId,
			representation: submission.representation
		});

		if (submissionId === PLACEHOLDER_SUBMISSION_ID) {
			await updateSubmissionRepository(dbSubmission.id, {
				submissionId: dbSubmission.id
			});

			return {
				...dbSubmission,
				submissionId: dbSubmission.id
			};
		}

		return dbSubmission;
	} catch (e) {
		if (
			e.name === 'SequelizeDatabaseError' &&
			e.parent.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
		) {
			throw ApiError.badRequest(e.message);
		} else {
			throw e;
		}
	}
};

const completeNISubmission = async (submissionId) => {
	const submission = await getSubmissionRepository(submissionId);
	if (!submission) throw ApiError.notFound(`Submission with ID ${submissionId} not found`);

	const project = await getNIApplication(submission.caseReference);
	if (!project)
		throw ApiError.notFound(`Project with case reference ${submission.caseReference} not found`);

	await Promise.all([
		updateSubmissionsBySubmissionIdRepository(submissionId, { validated: new Date() }),
		sendSubmissionNotification({
			submissionId: submission.id,
			email: submission.email,
			project: {
				name: project.ProjectName,
				email: project.ProjectEmailAddress
			}
		})
	]);
};

module.exports = {
	createNISubmission,
	completeNISubmission
};
