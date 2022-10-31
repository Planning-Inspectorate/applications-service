const { getExaminationSession } = require('./examination-session');

const addKeyValueToActiveSubmissionItem = (session, key, value) => {
	if (key === 'undefined' || value === 'undefined') throw new Error('Key or value is undefined');

	const activeSubmissionItem = getActiveSubmissionItem(session);
	activeSubmissionItem[key] = value;
};

const getActiveSubmissionItemFiles = (session) => {
	const submissionItem = getActiveSubmissionItem(session);
	if (!submissionItem.files) throw new Error('No files for submission item');
	if (!Array.isArray(submissionItem.files)) throw new Error('Files is not an array');
	if (submissionItem.files.length === 0) throw new Error('Files length is 0');
	return submissionItem.files;
};

const getActiveSubmissionItem = (session) => {
	const examinationSession = getExaminationSession(session);
	const activeSubmissionItem = examinationSession.submissionItems.find(
		(item) => item.itemId === examinationSession.activeItem
	);

	if (!activeSubmissionItem) throw new Error('Can not find active submission item');

	return activeSubmissionItem;
};

const getSubmissionItemSubmissionType = (activeSubmissionItem) => {
	const submissionType = activeSubmissionItem.submissionType;

	if (!submissionType) throw new Error('No submission type');

	return submissionType;
};

const getActiveSubmissionItemKey = (session) => {
	const examinationSession = getExaminationSession(session);
	const activeDeadlineItem = examinationSession.activeItem;
	if (!activeDeadlineItem) return false;
	return activeDeadlineItem;
};

const setActiveSubmissionItem = (examinationSession, activeItem) =>
	(examinationSession.activeItem = activeItem);

const checkIfSubmissionItemExists = (examinationSession, submissionItemId) =>
	examinationSession.submissionItems.find((item) => item.itemId === submissionItemId);

const setSubmissionItem = (session, submissionItem) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession || !submissionItem) throw new Error('Session issue');

	if (!examinationSession.submissionItems) {
		examinationSession.submissionItems = [];
	}

	if (!checkIfSubmissionItemExists(examinationSession, submissionItem.value)) {
		examinationSession.submissionItems.push({
			itemId: submissionItem.value,
			submissionItem: submissionItem.text,
			completed: false
		});
	}

	setActiveSubmissionItem(examinationSession, submissionItem.value);
};

const getSubmissionFilesLength = (session) => {
	const examinationSession = getExaminationSession(session);

	let length = 0;

	examinationSession.submissionItems.forEach((submissionItem) => {
		if (submissionItem.files) length += submissionItem.files.length;
	});

	return length;
};

module.exports = {
	addKeyValueToActiveSubmissionItem,
	getActiveSubmissionItemKey,
	getActiveSubmissionItem,
	setSubmissionItem,
	getSubmissionItemSubmissionType,
	getActiveSubmissionItemFiles,
	getSubmissionFilesLength
};
