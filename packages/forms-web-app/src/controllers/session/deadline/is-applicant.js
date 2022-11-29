const { getExaminationSession } = require('../examination-session');

const deadlineIsApplicantKey = 'isApplicant';

const getDeadlineIsApplicant = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineIsApplicantKey])
		throw new Error('Deadline is applicant not found');

	return examinationSession[deadlineIsApplicantKey];
};

const setDeadlineIsApplicant = (session, isApplicant) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineIsApplicantKey] = isApplicant;
};

module.exports = { deadlineIsApplicantKey, getDeadlineIsApplicant, setDeadlineIsApplicant };
