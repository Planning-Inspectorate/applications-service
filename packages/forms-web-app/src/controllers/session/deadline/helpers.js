const { getExaminationSession } = require('../examination-session');

const getUserHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.hasInterestedPartyNumber === 'yes';
};

const getUserIsApplicant = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession.isApplicant === 'yes';
};

module.exports = { getUserHasInterestedPartyNumber, getUserIsApplicant };
