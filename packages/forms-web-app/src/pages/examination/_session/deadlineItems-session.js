const { getExaminationSession } = require('./examination-session');
const { getEditModeSubmissionItemId } = require('./submission-items-session');

const findDeadlineItemByValue = (session, value) => {
	const examinationSession = getExaminationSession(session);

	const deadlineItems = examinationSession.deadlineItems.find((item) => item.value === value);

	if (!deadlineItems) throw new Error('No deadline items in session');
	return deadlineItems;
};

const getDeadlineItems = (session) => {
	const examinationSession = getExaminationSession(session);
	if (!examinationSession.deadlineItems) throw new Error('No deadline items in session');
	if (!Array.isArray(examinationSession.deadlineItems))
		throw new Error('Deadlines is not an array');
	return examinationSession.deadlineItems;
};

const setDeadlineItemToDelete = (session, itemId) => {
	if (itemId === undefined) throw new Error('No item id to delete');

	const examinationSession = getExaminationSession(session);
	examinationSession.deadlineItemToDelete = itemId;
};

const getDeadlineItemToDelete = (session) => {
	const examinationSession = getExaminationSession(session);
	if (examinationSession.deadlineItemToDelete === undefined)
		throw new Error('No deadline itemID to delete');
	return examinationSession.deadlineItemToDelete;
};

const getDeadlineItemStillToSubmit = (session) => {
	const examinationSession = getExaminationSession(session);
	const deadlineItems = [...examinationSession.deadlineItems];
	const submissionItems = examinationSession.submissionItems || [];
	const editModeSubmissionItemId = getEditModeSubmissionItemId(session);

	return deadlineItems.filter((deadlineItem) => {
		const submissionItemAdded = submissionItems.find(
			(submissionItem) => submissionItem.itemId === deadlineItem.value
		);
		if (
			!submissionItemAdded ||
			!submissionItemAdded.submitted ||
			submissionItemAdded.itemId === editModeSubmissionItemId
		)
			return deadlineItem;
	});
};

module.exports = {
	findDeadlineItemByValue,
	getDeadlineItems,
	getDeadlineItemStillToSubmit,
	getDeadlineItemToDelete,
	setDeadlineItemToDelete
};
