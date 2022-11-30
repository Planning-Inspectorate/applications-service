const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineHasInterestedPartyNumberKey = 'hasInterestedPartyNumber';

const getDeadlineHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineHasInterestedPartyNumberKey])
		throw new Error('Deadline has interested party number not found');

	return examinationSession[deadlineHasInterestedPartyNumberKey];
};

const setDeadlineHasInterestedPartyNumber = (session, hasInterestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineHasInterestedPartyNumberKey] = hasInterestedPartyNumber;
};

module.exports = {
	deadlineHasInterestedPartyNumberKey,
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
};
