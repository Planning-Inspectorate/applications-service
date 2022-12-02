const { getExaminationSession } = require('../../examination-session');

const deadlineInterestedPartyNumberKey = 'interestedPartyNumber';

const getDeadlineDetailsInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineInterestedPartyNumberKey])
		throw new Error('Deadline interested party number not found');

	return examinationSession[deadlineInterestedPartyNumberKey];
};

const setDeadlineDetailsInterestedPartyNumber = (session, interestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineInterestedPartyNumberKey] = interestedPartyNumber;
};

module.exports = {
	getDeadlineDetailsInterestedPartyNumber,
	setDeadlineDetailsInterestedPartyNumber
};
