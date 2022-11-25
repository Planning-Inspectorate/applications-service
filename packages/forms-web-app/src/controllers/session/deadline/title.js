const { getExaminationSession } = require('../examination-session');

const getDeadlineTitle = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.title) throw new Error('Deadline title not found');

	return examinationSession.title;
};

const setDeadlineTitle = (session, title) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.title = title;
};

module.exports = { getDeadlineTitle, setDeadlineTitle };
