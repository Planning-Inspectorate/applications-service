const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineNameKey = 'name';

const getDeadlineName = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineNameKey]) throw new Error('Deadline name not found');

	return examinationSession[deadlineNameKey];
};

const setDeadlineName = (session, name) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineNameKey] = name;
};

module.exports = { getDeadlineName, setDeadlineName };
