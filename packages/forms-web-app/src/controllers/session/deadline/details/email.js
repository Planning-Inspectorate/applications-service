const { getExaminationSession } = require('../../examination-session');

const getDeadlineEmail = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.email) throw new Error('Deadline email not found');

	return examinationSession.email;
};

const setDeadlineEmail = (session, email) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.email = email;
};

module.exports = { getDeadlineEmail, setDeadlineEmail };
