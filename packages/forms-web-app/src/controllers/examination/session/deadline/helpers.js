const { getExaminationSession } = require('../examination-session');
const { deadlineHasInterestedPartyNumberKey } = require('./details/has-interested-party-number');
const { deadlineApplicantKey } = require('./details/applicant');

const getUserHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineHasInterestedPartyNumberKey] === 'yes';
};

const getUserApplicant = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineApplicantKey] === 'yes';
};

module.exports = { getUserHasInterestedPartyNumber, getUserApplicant };
