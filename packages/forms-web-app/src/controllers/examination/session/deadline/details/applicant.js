const { getExaminationSession } = require('../../examination-session');

const deadlineApplicantKey = 'isApplicant';

const getDeadlineDetailsApplicant = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineApplicantKey]) throw new Error('Deadline applicant not found');

	return examinationSession[deadlineApplicantKey];
};

const setDeadlineDetailsApplicant = (session, applicant) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineApplicantKey] = applicant;
};

module.exports = { deadlineApplicantKey, getDeadlineDetailsApplicant, setDeadlineDetailsApplicant };
