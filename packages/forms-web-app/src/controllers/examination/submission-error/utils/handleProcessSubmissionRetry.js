const {
	getExaminationSubmissionRetryErrorCount,
	setExaminationUploadingState,
	setExaminationSubmissionComplete,
	setExaminationSubmissionRetryErrorCount
} = require('../../session/examination-session');

const maxProcessSubmissionRetry = 2;
const handleProcessSubmissionRetry = (session) => {
	if (getExaminationSubmissionRetryErrorCount(session) >= maxProcessSubmissionRetry) {
		setExaminationUploadingState(session, true);
		throw new Error(
			`Maximum process submission retry limit (${maxProcessSubmissionRetry}) reached`
		);
	}

	setExaminationUploadingState(session, false);
	setExaminationSubmissionComplete(session, false);
	setExaminationSubmissionRetryErrorCount(session);
};

module.exports = {
	handleProcessSubmissionRetry
};
