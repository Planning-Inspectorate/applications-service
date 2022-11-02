const { getActiveSubmissionItem } = require('../session/submission-items-session');

const addFileToSession = (session, file) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);

	if (!activeSubmissionItem.files) {
		activeSubmissionItem.files = [];
	}

	delete file.raw.data;
	activeSubmissionItem.files.push(file);
};

const deleteFileInSession = (session, fileName) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);

	activeSubmissionItem.files = activeSubmissionItem.files.filter(
		(file) => file.uniqueFileName !== fileName
	);
};

const getUploadedFilesFromSession = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);

	if (!activeSubmissionItem.files) {
		activeSubmissionItem.files = [];
	}

	return activeSubmissionItem.files;
};

module.exports = {
	addFileToSession,
	deleteFileInSession,
	getUploadedFilesFromSession
};
