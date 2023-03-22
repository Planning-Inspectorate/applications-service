const logger = require('../../../lib/logger');

const getExaminationSession = (session) => {
	const examinationSession = session?.examination;
	if (!examinationSession) throw new Error('No examination session');
	return examinationSession;
};

const hasExaminationSession = (session) => session.examination;

const getExaminationTimetableId = ({ examination }) => examination.examinationTimetableId;

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

const getExaminationSubmissionItems = (session) => {
	const examinationSession = getExaminationSession(session);
	const examinationSubmissionItems = examinationSession.submissionItems;
	if (!examinationSubmissionItems) throw new Error('Examination submission items not found');
	return examinationSubmissionItems;
};

const getExaminationSubmissionComplete = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.submissionComplete;
};

const getExaminationSubmissionId = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.submissionId;
};

const getExaminationEmailAddress = (session) => getExaminationSession(session).email;

const getExaminationSubmissionRetryErrorCount = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.retryErrorCount;
};

const setExaminationSubmissionRetryErrorCount = (session) => {
	const examinationSession = getExaminationSession(session);
	if (!examinationSession.retryErrorCount) examinationSession.retryErrorCount = 1;
	else examinationSession.retryErrorCount++;
};

module.exports = {
	hasExaminationSession,
	getExaminationSession,
	getExaminationTimetableId,
	setExaminationUploadingState,
	setExaminationSubmissionComplete,
	setExaminationSubmissionId,
	getExaminationSubmissionItems,
	getExaminationSubmissionComplete,
	getExaminationUploadingState,
	getExaminationSubmissionId,
	getExaminationEmailAddress,
	getExaminationSubmissionRetryErrorCount,
	setExaminationSubmissionRetryErrorCount
};
