const { getExaminationSession } = require('../examination-session');

const getDeadlineCaseRef = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.caseRef) throw new Error('Deadline case ref not found');

	return examinationSession.caseRef;
};

const setDeadlineCaseRef = (session, caseRef) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.caseRef = caseRef;
};

module.exports = { getDeadlineCaseRef, setDeadlineCaseRef };
