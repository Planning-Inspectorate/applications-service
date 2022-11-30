const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineInterestedPartyNumberKey = 'interestedPartyNumber';

const getDeadlineInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineInterestedPartyNumberKey])
		throw new Error('Deadline interested party number not found');

	return examinationSession[deadlineInterestedPartyNumberKey];
};

const setDeadlineInterestedPartyNumber = (session, interestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineInterestedPartyNumberKey] = interestedPartyNumber;
};

module.exports = { getDeadlineInterestedPartyNumber, setDeadlineInterestedPartyNumber };
