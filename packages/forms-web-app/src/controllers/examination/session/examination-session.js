const logger = require('../../../lib/logger');

const setExaminationSession = (session) => {
	if (!session?.examination) session.examination = {};
};

const getExaminationSession = (session) => {
	const examinationSession = session?.examination;
	if (!examinationSession) throw new Error('No examination session');
	return examinationSession;
};

const deleteExaminationSession = (session) => {
	delete session.examination;
};

const setExaminationUploadingState = (session, state) => {
	const examinationSession = getExaminationSession(session);
	if (typeof state !== 'boolean') throw new Error('Examination upload state is not a boolean');
	examinationSession.uploading = state;
	// Save is necessary to save the session in between states- https://stackoverflow.com/a/26532987
	session.save(function (err) {
		if (err) logger.error(err);
	});
};

const getExaminationUploadingState = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.uploading;
};

const setExaminationSubmissionComplete = (session, state) => {
	const examinationSession = getExaminationSession(session);
	if (typeof state !== 'boolean')
		throw new Error('Examination submission complete state is not a boolean');
	examinationSession.submissionComplete = state;
	// Save is necessary to save the session in between states- https://stackoverflow.com/a/26532987
	session.save(function (err) {
		if (err) logger.error(err);
	});
};

const setExaminationSubmissionId = (session, submissionId) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.submissionId = submissionId;
};

const getExaminationSubmissionComplete = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.submissionComplete;
};

const getExaminationSubmissionId = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.submissionId;
};

module.exports = {
	setExaminationSession,
	getExaminationSession,
	deleteExaminationSession,
	setExaminationUploadingState,
	setExaminationSubmissionComplete,
	setExaminationSubmissionId,
	getExaminationSubmissionComplete,
	getExaminationUploadingState,
	getExaminationSubmissionId
};
