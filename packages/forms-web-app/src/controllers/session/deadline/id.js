const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineIdKey = 'id';

const getDeadlineId = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineIdKey]) throw new Error('Deadline id not found');

	return examinationSession[deadlineIdKey];
};

const setDeadlineId = (session, id) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineIdKey] = id;
};

module.exports = { getDeadlineId, setDeadlineId };
