const db = require('../models');
const ApiError = require('../error/apiError');
const { sendSubmissionNotification } = require('../lib/notify');

const PLACEHOLDER_SUBMISSION_ID = 0;

const createSubmission = async (submission) => {
	try {
		const submissionId = submission.submissionId || PLACEHOLDER_SUBMISSION_ID;

		const dbSubmission = await db.Submission.create({
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
			await updateSubmission({
				id: dbSubmission.dataValues.id,
				submissionId: dbSubmission.dataValues.id
			});

			return {
				...dbSubmission.dataValues,
				submissionId: dbSubmission.dataValues.id
			};
		}

		return dbSubmission.dataValues;
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

const updateSubmission = async (submission) => {
	let updateData = {};

	if (submission.submissionId) updateData.submissionId = submission.submissionId;

	if (submission.file) {
		updateData.filenameOriginal = submission.file.originalName;
		updateData.filename = submission.file.name;
		updateData.fileSize = submission.file.size;
		updateData.fileMD5 = submission.file.md5;
	}

	return await db.Submission.update(updateData, {
		where: {
			id: submission.id
		}
	});
};

const getSubmission = (submissionId) => db.Submission.findOne({ where: { id: submissionId } });

const completeSubmission = async (submissionId) => {
	const submission = await getSubmission(submissionId);

	if (!submission) {
		throw ApiError.notFound(`Submission with ID ${submissionId} not found`);
	}

	console.log(`Found submission with ID ${submission.id}, email: ${submission.email}`);

	sendSubmissionNotification(submission);
};

module.exports = {
	createSubmission,
	updateSubmission,
	completeSubmission
};
