const { getExaminationSession } = require('../../examination-session');

const deadlineNameKey = 'name';

const getDeadlineDetailsName = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineNameKey]) throw new Error('Deadline name not found');

	return examinationSession[deadlineNameKey];
};

const getDeadlineDetailsNameOrDefault = (session) =>
	getExaminationSession(session)[deadlineNameKey];

const setDeadlineDetailsName = (session, name) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineNameKey] = name;
};

module.exports = {
	getDeadlineDetailsName,
	setDeadlineDetailsName,
	getDeadlineDetailsNameOrDefault
};
