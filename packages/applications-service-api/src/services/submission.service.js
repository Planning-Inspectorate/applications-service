const db = require('../models');

const PLACEHOLDER_SUBMISSION_ID = 0;

const createSubmission = async (submission) => {
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

module.exports = {
	createSubmission,
	updateSubmission
};
