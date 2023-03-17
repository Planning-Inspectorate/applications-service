const { getExaminationSession } = require('../../examination-session');

const deadlineApplicantKey = 'isApplicant';

const getExaminationApplicantValue = (session) => {
	const examinationSession = getExaminationSession(session);

	return examinationSession?.[deadlineApplicantKey];
};

const getDeadlineDetailsApplicant = (session) => {
	const deadlineDetailsApplicant = getExaminationApplicantValue(session);

	if (!deadlineDetailsApplicant) throw new Error('Deadline applicant not found');

	return deadlineDetailsApplicant;
};

const setDeadlineDetailsApplicant = (session, applicant) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineApplicantKey] = applicant;
};

module.exports = {
	deadlineApplicantKey,
	getDeadlineDetailsApplicant,
	getExaminationApplicantValue,
	setDeadlineDetailsApplicant
};
