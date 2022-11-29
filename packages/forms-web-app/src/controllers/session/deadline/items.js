const { getExaminationSession } = require('../examination-session');

const deadlineItemsKey = 'deadlineItems';

const getDeadlineItems = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineItemsKey]) throw new Error('Deadline items not found');

	return examinationSession[deadlineItemsKey];
};

const setDeadlineItems = (session, items) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineItemsKey] = items;
};

module.exports = { getDeadlineItems, setDeadlineItems };
