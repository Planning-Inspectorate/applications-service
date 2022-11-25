const { getExaminationSession } = require('../../examination-session');

const getDeadlineName = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.name) throw new Error('Deadline name not found');

	return examinationSession.name;
};

const setDeadlineName = (session, name) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.name = name;
};

module.exports = { getDeadlineName, setDeadlineName };
