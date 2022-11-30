const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineCaseRefKey = 'caseRef';

const getDeadlineCaseRef = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineCaseRefKey]) throw new Error('Deadline case ref not found');

	return examinationSession[deadlineCaseRefKey];
};

const setDeadlineCaseRef = (session, caseRef) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineCaseRefKey] = caseRef;
};

module.exports = { getDeadlineCaseRef, setDeadlineCaseRef };
