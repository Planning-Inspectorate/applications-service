const logger = require('../../../../lib/logger');
const { postSubmission } = require('../../../../services/submission.service');
const { getListOfFormData } = require('./fromDataMappers');
const {
	setExaminationSubmissionComplete,
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
		examinationSession.submissionId = submissionId;

		setExaminationSubmissionComplete(session, true);
	} catch (error) {
		logger.error(error);
		throw new Error('Process Submission failed');
	}
};

module.exports = {
	handleProcessSubmission
};
