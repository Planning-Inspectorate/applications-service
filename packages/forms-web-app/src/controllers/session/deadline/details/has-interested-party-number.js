const { getExaminationSession } = require('../../examination-session');

const getDeadlineHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.hasInterestedPartyNumber)
		throw new Error('Deadline interested party number not found');

	return examinationSession.hasInterestedPartyNumber;
};

const setDeadlineHasInterestedPartyNumber = (session, hasInterestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.hasInterestedPartyNumber = hasInterestedPartyNumber;
};

module.exports = {
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
};
