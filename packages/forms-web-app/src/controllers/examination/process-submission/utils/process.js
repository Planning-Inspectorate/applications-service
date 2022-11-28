const logger = require('../../../../lib/logger');
const {
	postSubmission,
	postSubmissionComplete
} = require('../../../../services/submission.service');

const { getListOfFormData } = require('./fromDataMappers');
const {
	setExaminationSubmissionComplete,
	setExaminationSubmissionId,
	getExaminationSession
} = require('../../session/examination-session');

const handleProcessSubmission = async (session) => {
	logger.info('Attempting process submission');
	try {
		let submissionId;
		const examinationSession = getExaminationSession(session);
		for (const item of examinationSession.submissionItems) {
			const listOfCommentAndFiles = getListOfFormData(examinationSession, item);
			for (let form of listOfCommentAndFiles) {
				if (submissionId) form.append('submissionId', submissionId);
				const response = await postSubmission(examinationSession.caseRef, form);
				submissionId = response.data.submissionId;
			}
		}
		logger.info('Processing files complete');
		setExaminationSubmissionComplete(session, true);
		setExaminationSubmissionId(session, submissionId);

		await submissionComplete(submissionId);
	} catch (error) {
		logger.error(error);
		throw new Error('Process Submission failed');
	}
};

const submissionComplete = async (submissionId) => {
	try {
		await postSubmissionComplete(submissionId);
	} catch (error) {
		logger.error(error);
		throw new Error('Submission Complete request failed');
	}
};

module.exports = {
	handleProcessSubmission
};
