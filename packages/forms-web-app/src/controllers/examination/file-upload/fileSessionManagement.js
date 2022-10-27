const { getSelectedDeadlineItemFromSession } = require('../utils/sessionHelpers');

const addFileToSession = (session, file) => {
	const examinationSession = session?.examination;

	const selectedDeadline = getSelectedDeadlineItemFromSession(examinationSession);

	if (!selectedDeadline.files) {
		selectedDeadline.files = [];
	}

	selectedDeadline.files.push(file);
};

const deleteFileInSession = (session, fileName) => {
	const examinationSession = session?.examination;
	const selectedDeadline = getSelectedDeadlineItemFromSession(examinationSession);

	selectedDeadline.files = selectedDeadline.files.filter(
		(file) => file.uniqueFileName !== fileName
	);
};

const getUploadedFilesFromSession = (session) => {
	const examinationSession = session?.examination;

	const selectedDeadline = getSelectedDeadlineItemFromSession(examinationSession);

	if (!selectedDeadline.files) {
		selectedDeadline.files = [];
	}

	return selectedDeadline.files;
};

module.exports = {
	addFileToSession,
	deleteFileInSession,
	getUploadedFilesFromSession
};
