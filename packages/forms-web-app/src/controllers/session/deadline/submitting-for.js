const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineSubmittingForKey = 'submittingFor';

const getDeadlineSubmittingFor = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineSubmittingForKey])
		throw new Error('Deadline submitting for not found');

	return examinationSession[deadlineSubmittingForKey];
};

const setDeadlineSubmittingFor = (session, submittingFor) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineSubmittingForKey] = submittingFor;
};

module.exports = { getDeadlineSubmittingFor, setDeadlineSubmittingFor };
