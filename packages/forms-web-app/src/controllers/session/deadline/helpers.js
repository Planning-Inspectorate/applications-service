const { getExaminationSession } = require('../../examination/session/examination-session');
const { deadlineHasInterestedPartyNumberKey } = require('./has-interested-party-number');
const { deadlineIsApplicantKey } = require('./is-applicant');

const getUserHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineHasInterestedPartyNumberKey] === 'yes';
};

const getUserIsApplicant = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineIsApplicantKey] === 'yes';
};

module.exports = { getUserHasInterestedPartyNumber, getUserIsApplicant };
