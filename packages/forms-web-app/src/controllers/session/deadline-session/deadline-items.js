const { getExaminationSession } = require('../examination-session');

const getDeadlineItems = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.deadlineItems) throw new Error('Deadline items not found');

	return examinationSession.deadlineItems;
};

const setDeadlineItems = (session, items) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.deadlineItems = items;
};

module.exports = { getDeadlineItems, setDeadlineItems };
