const { getExaminationSession } = require('../examination-session');

const getDeadlineId = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.id) throw new Error('Deadline id not found');

	return examinationSession.id;
};

const setDeadlineId = (session, id) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.id = id;
};

module.exports = { getDeadlineId, setDeadlineId };
