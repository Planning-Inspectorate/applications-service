const { getExaminationSession } = require('../../examination-session');

const deadlineSubmittingForKey = 'submittingFor';

const getDeadlineDetailsSubmittingFor = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineSubmittingForKey])
		throw new Error('Deadline submitting for not found');

	return examinationSession[deadlineSubmittingForKey];
};

const setDeadlineDetailsSubmittingFor = (session, submittingFor) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineSubmittingForKey] = submittingFor;
};

module.exports = {
	deadlineSubmittingForKey,
	getDeadlineDetailsSubmittingFor,
	setDeadlineDetailsSubmittingFor
};
