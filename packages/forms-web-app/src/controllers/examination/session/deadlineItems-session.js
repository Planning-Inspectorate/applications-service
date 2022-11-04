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

const getDeadlineItemStillToSubmit = (session) => {
	const examinationSession = getExaminationSession(session);
	const deadlineItemsStillToSubmit = [];
	examinationSession.deadlineItems.forEach((item) => {
		if (
			!examinationSession.submissionItems.find((subItem) => subItem.submissionItem === item.text)
		) {
			deadlineItemsStillToSubmit.push(item);
		}
	});
	return deadlineItemsStillToSubmit;
};

module.exports = {
	findDeadlineItemByValue,
	getDeadlineItems,
	getDeadlineItemStillToSubmit
};
