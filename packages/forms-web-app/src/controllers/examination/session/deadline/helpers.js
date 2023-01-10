const { getExaminationSession } = require('../examination-session');
const { deadlineApplicantKey } = require('./details/applicant');
const { deadlineHasInterestedPartyNumberKey } = require('./details/has-interested-party-number');
const { deadlineSubmittingForKey } = require('./details/submitting-for');

const getUserIsSubmittingFor = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineSubmittingForKey];
};

const getUserHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineHasInterestedPartyNumberKey] === 'yes';
};

const isUserApplicant = (session) => {
	const examinationSession = getExaminationSession(session);
	return examinationSession[deadlineApplicantKey] === 'yes';
};

module.exports = { getUserIsSubmittingFor, getUserHasInterestedPartyNumber, isUserApplicant };
