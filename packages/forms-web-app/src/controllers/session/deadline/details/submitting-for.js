const { getExaminationSession } = require('../../examination-session');

const getDeadlineSubmittingFor = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.submittingFor) throw new Error('Deadline submitting for not found');

	return examinationSession.submittingFor;
};

const setDeadlineSubmittingFor = (session, submittingFor) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.submittingFor = submittingFor;
};

module.exports = { getDeadlineSubmittingFor, setDeadlineSubmittingFor };
