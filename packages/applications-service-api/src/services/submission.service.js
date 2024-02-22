const moment = require('moment');
const config = require('../lib/config');
const ApiError = require('../error/apiError');
const { createNISubmission, completeNISubmission } = require('./submission.ni.service');
const { publishDeadlineSubmission } = require('./backoffice.publish.service');
const { generateRepresentationPDF, uploadSubmissionFileToBlobStorage } = require('../utils/file');
const { getDate } = require('../utils/date-utils');
const { getApplication } = require('./application.backoffice.service');
const { sendSubmissionNotification } = require('../lib/notify');

const createSubmission = async (submission) =>
	isBackOfficeSubmission(submission.metadata.caseReference)
		? createBackOfficeSubmission(submission)
		: createNISubmission(submission);

const completeSubmission = async (submissionDetails) =>
	isBackOfficeSubmission(submissionDetails.caseReference)
		? completeBackOfficeSubmission(submissionDetails)
		: completeNISubmission(submissionDetails.submissionId);

const createBackOfficeSubmission = async (submission) => {
	const { metadata } = submission;

	if (!metadata.submissionId) metadata.submissionId = generateSubmissionId(metadata.caseReference);

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

const generateSubmissionId = (caseReference) =>
	`${caseReference}-${moment(getDate()).format('DDMMYYHHmmssSSS')}`;

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

const isBackOfficeSubmission = (caseReference) =>
	config.backOfficeIntegration.submissions.postSubmission.caseReferences.includes(caseReference);

module.exports = {
	createSubmission,
	completeSubmission
};
