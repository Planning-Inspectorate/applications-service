const { getExaminationSession } = require('../../examination-session');

const deadlineEmailKey = 'email';

const getDeadlineDetailsEmail = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineEmailKey]) throw new Error('Deadline email not found');

	return examinationSession[deadlineEmailKey];
};

const getDeadlineDetailsEmailOrDefault = (session) =>
	getExaminationSession(session)[deadlineEmailKey];

const setDeadlineDetailsEmail = (session, email) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineEmailKey] = email;
};

module.exports = {
	getDeadlineDetailsEmail,
	setDeadlineDetailsEmail,
	getDeadlineDetailsEmailOrDefault
};
