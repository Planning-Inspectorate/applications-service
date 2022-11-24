const { getExaminationSession } = require('../examination-session');

const getDeadlineInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.interestedPartyNumber)
		throw new Error('Deadline interested party number not found');

	return examinationSession.interestedPartyNumber;
};

const setDeadlineInterestedPartyNumber = (session, interestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.interestedPartyNumber = interestedPartyNumber;
};

module.exports = { getDeadlineInterestedPartyNumber, setDeadlineInterestedPartyNumber };
