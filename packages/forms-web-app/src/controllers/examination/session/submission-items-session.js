const { getExaminationSession } = require('./examination-session');

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

const findSubmissionItemToDelete = (session, itemIdToDelete) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.submissionItems.find((item) => item.itemId === itemIdToDelete);
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
	const activeSubmissionItemId = getActiveSubmissionItemId(session);
	const activeSubmissionItem = getSubmissionItemById(session, activeSubmissionItemId);

	if (!activeSubmissionItem) throw new Error('Can not find active submission item');

	return activeSubmissionItem;
};

const getSubmissionItemById = (session, itemId) => {
	const examinationSession = getExaminationSession(session);

	const submissionItems = examinationSession.submissionItems;

	if (submissionItems) {
		const submissionItem = examinationSession.submissionItems.find(
			(item) => item.itemId === itemId
		);

		return submissionItem;
	}
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

const getActiveSubmissionItemId = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.activeSubmissionItemId;
};

const setActiveSubmissionItemId = (session, activeItemId) => {
	const examinationSession = getExaminationSession(session);
	examinationSession.activeSubmissionItemId = activeItemId;
};

const deleteActiveSubmissionItemId = (session) => {
	const examinationSession = getExaminationSession(session);
	delete examinationSession.activeSubmissionItemId;
};

const updateActiveSubmissionItem = (session, selectedDeadlineOption) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	activeSubmissionItem.itemId = selectedDeadlineOption.value;
	activeSubmissionItem.submissionItem = selectedDeadlineOption.text;

	setActiveSubmissionItemId(session, selectedDeadlineOption.value);
};

const setActiveSubmissionItem = (session, submissionItem) => {
	const examinationSession = getExaminationSession(session);

	if (!submissionItem) throw new Error('No submission item');

	if (!examinationSession.submissionItems) examinationSession.submissionItems = [];

	if (!getActiveSubmissionItemId(session)) {
		examinationSession.submissionItems.push({
			itemId: submissionItem.value,
			submissionItem: submissionItem.text,
			submitted: false
		});

		setActiveSubmissionItemId(session, submissionItem.value);
	} else updateActiveSubmissionItem(session, submissionItem);
};

const setEditModeSubmissionItemId = (session, itemId) => {
	const examinationSession = getExaminationSession(session);
	examinationSession.editModeSubmissionItemId = itemId;
};

const getEditModeSubmissionItemId = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.editModeSubmissionItemId;
};

const deleteEditModeSubmissionItemId = (session) => {
	const examinationSession = getExaminationSession(session);
	delete examinationSession.editModeSubmissionItemId;
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
	getActiveSubmissionItemId,
	getActiveSubmissionItem,
	setActiveSubmissionItem,
	setActiveSubmissionItemId,
	setActiveSubmissionItemSubmitted,
	setSubmissionItemSubmitted,
	getSubmissionItemType,
	getActiveSubmissionItemFiles,
	getSubmissionItemFiles,
	getSubmissionFilesLength,
	getSubmissionItemComment,
	getSubmissionItemPersonalInformation,
	deleteSubmissionItem,
	deleteActiveSubmissionItemId,
	setEditModeSubmissionItemId,
	getEditModeSubmissionItemId,
	deleteEditModeSubmissionItemId,
	updateActiveSubmissionItem,
	findSubmissionItemToDelete
};
