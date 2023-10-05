const moment = require('moment');
const config = require('../lib/config');
const { createNISubmission, completeNISubmission } = require('./submission.ni.service');
const { publishDeadlineSubmission } = require('./backoffice.publish.service');
const { generateRepresentationPDF, uploadToBlobStorage } = require('../utils/file');
const { getDate } = require('../utils/date-utils');

const createSubmission = async (submission) =>
	isBackOfficeSubmission(submission.metadata.caseReference)
		? createBackOfficeSubmission(submission)
		: createNISubmission(submission);

const completeSubmission = async (submissionId) => completeNISubmission(submissionId);

const createBackOfficeSubmission = async (submission) => {
	const { metadata } = submission;

	if (!metadata.submissionId) metadata.submissionId = generateSubmissionId(metadata.caseReference);

	if (metadata.representation) {
		submission.file = generateRepresentationPDF(
			metadata.submissionId,
			metadata.representation,
			`Written-Representation-${metadata.submissionId}.pdf`
		);
	}

	const blobGuid = await uploadToBlobStorage(submission.file);
	await publishDeadlineSubmission(submission, blobGuid);

	return {
		submissionId: metadata.submissionId
	};
};

const generateSubmissionId = (caseReference) =>
	`${caseReference}-${moment(getDate()).format('DDMMYYHHmmssSSS')}`;

const isBackOfficeSubmission = (caseReference) =>
	config.backOfficeIntegration.submissions.postSubmission.caseReferences.includes(caseReference);

module.exports = {
	createSubmission,
	completeSubmission
};
