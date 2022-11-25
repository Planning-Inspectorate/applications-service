const { getExaminationSession } = require('../../examination-session');

const getDeadlineIsApplicant = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.isApplicant) throw new Error('Deadline is applicant not found');

	return examinationSession.isApplicant;
};

const setDeadlineIsApplicant = (session, isApplicant) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.isApplicant = isApplicant;
};

module.exports = { getDeadlineIsApplicant, setDeadlineIsApplicant };
