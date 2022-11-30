const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineEmailKey = 'email';

const getDeadlineEmail = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineEmailKey]) throw new Error('Deadline email not found');

	return examinationSession[deadlineEmailKey];
};

const setDeadlineEmail = (session, email) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineEmailKey] = email;
};

module.exports = { getDeadlineEmail, setDeadlineEmail };
