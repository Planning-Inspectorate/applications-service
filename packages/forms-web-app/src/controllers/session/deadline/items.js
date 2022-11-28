const { getExaminationSession } = require('../examination-session');

const getDeadlineItems = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.items) throw new Error('Deadline items not found');

	return examinationSession.items;
};

const setDeadlineItems = (session, items) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.deadlineItems = items;
};

module.exports = { getDeadlineItems, setDeadlineItems };
