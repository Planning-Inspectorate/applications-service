const { getExaminationSession } = require('./examination-session');

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
	const deadlineItemsStillToSubmit = [];
	const localDeadlineItems = [...examinationSession.deadlineItems];
	const localSubmissionItems = examinationSession.submissionItems || [];

	localDeadlineItems.forEach((item) => {
		if (!localSubmissionItems.find((subItem) => subItem.submissionItem === item.text))
			deadlineItemsStillToSubmit.push(item);
	});
	return deadlineItemsStillToSubmit;
};

module.exports = {
	findDeadlineItemByValue,
	getDeadlineItems,
	getDeadlineItemStillToSubmit,
	getDeadlineItemToDelete,
	setDeadlineItemToDelete
};
