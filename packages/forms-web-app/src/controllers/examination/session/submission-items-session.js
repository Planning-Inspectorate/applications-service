const { getExaminationSession } = require('../../session/examination-session');

const addKeyValueToActiveSubmissionItem = (session, key, value) => {
	if (key === 'undefined' || value === 'undefined') throw new Error('Key or value is undefined');

	const activeSubmissionItem = getActiveSubmissionItem(session);
	activeSubmissionItem[key] = value;
};

const deleteKeyFromActiveSubmissionItem = (session, key) => {
	if (session === 'undefined' || key === 'undefined')
		throw new Error('Session or key is undefined');

	const activeSubmissionItem = getActiveSubmissionItem(session);
	delete activeSubmissionItem[key];
};

const deleteSubmissionItem = (session, itemIdToDelete) => {
	const examinationSession = getExaminationSession(session);
	examinationSession.submissionItems = examinationSession.submissionItems.filter(
		(item) => item.itemId !== itemIdToDelete
	);
};

const getActiveSubmissionItemFiles = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	return getSubmissionItemFiles(activeSubmissionItem);
};

const getSubmissionItemFiles = (submissionItem) => {
	if (!submissionItem.files) throw new Error('No files for submission item');
	if (!Array.isArray(submissionItem.files))
		throw new Error('Submission item files is not an array');
	if (submissionItem.files.length === 0) throw new Error('Submission item files length is 0');
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

const getSubmissionItemType = (submissionItem) => {
	if (!submissionItem.submissionType)
		throw new Error('Submission item submission type is not defined');
	return submissionItem.submissionType;
};

const getSubmissionItemPersonalInformation = (submissionItem) => {
	if (!submissionItem.personalInformation)
		throw new Error('Submission item personal information is not defined');
	return submissionItem.personalInformation;
};

const getSubmissionItemComment = (submissionItem) => {
	return submissionItem.comment;
};

const getActiveSubmissionItemKey = (session) => {
	const examinationSession = getExaminationSession(session);
	const activeDeadlineItem = examinationSession.activeItem;
	if (!activeDeadlineItem) return false;
	return activeDeadlineItem;
};

const setActiveSubmissionItem = (session, activeItem) => {
	const examinationSession = getExaminationSession(session);
	examinationSession.activeItem = activeItem;
};

const deleteActiveItem = (session) => {
	const examinationSession = getExaminationSession(session);
	delete examinationSession.activeItem;
};

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
			submitted: false
		});
	}

	setActiveSubmissionItem(session, submissionItem.value);
};

const setActiveSubmissionItemSubmitted = (session, submitted) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	setSubmissionItemSubmitted(activeSubmissionItem, submitted);
};

const setSubmissionItemSubmitted = (submissionItem, submitted) => {
	if (!submissionItem?.submitted && typeof submissionItem?.submitted !== 'boolean')
		throw new Error('Submission item submitted is not defined');
	submissionItem.submitted = submitted;
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
	deleteKeyFromActiveSubmissionItem,
	getActiveSubmissionItemKey,
	getActiveSubmissionItem,
	setSubmissionItem,
	setActiveSubmissionItem,
	setActiveSubmissionItemSubmitted,
	setSubmissionItemSubmitted,
	getSubmissionItemType,
	getActiveSubmissionItemFiles,
	getSubmissionItemFiles,
	getSubmissionFilesLength,
	getSubmissionItemComment,
	getSubmissionItemPersonalInformation,
	deleteSubmissionItem,
	deleteActiveItem
};
