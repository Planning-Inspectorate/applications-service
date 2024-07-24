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
} = require('../../_session/examination-session');

const handleProcessSubmission = async (session) => {
	logger.info('Attempting process submission');
	try {
		let submissionId;
		const examinationSession = getExaminationSession(session);
		for (const item of examinationSession.submissionItems) {
			const listOfCommentAndFiles = getListOfFormData(session, item);
			for (let form of listOfCommentAndFiles) {
				if (submissionId) form.append('submissionId', submissionId);
				const response = await postSubmission(session.caseRef, form);
				submissionId = response.data.submissionId;
			}
		}
		logger.info('Processing files complete');
		setExaminationSubmissionComplete(session, true);
		setExaminationSubmissionId(session, submissionId);

		await postSubmissionComplete(submissionId, {
			caseReference: session.caseRef,
			email: session.examination.email
		});
	} catch (error) {
		logger.error(error);
		throw new Error('Process Submission failed');
	}
};

module.exports = {
	handleProcessSubmission
};
