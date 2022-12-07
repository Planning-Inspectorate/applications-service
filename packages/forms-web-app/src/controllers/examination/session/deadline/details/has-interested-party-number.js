const { getExaminationSession } = require('../../examination-session');

const deadlineHasInterestedPartyNumberKey = 'hasInterestedPartyNo';

const getDeadlineDetailsHasInterestedPartyNumber = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineHasInterestedPartyNumberKey])
		throw new Error('Deadline has interested party number not found');

	return examinationSession[deadlineHasInterestedPartyNumberKey];
};

const setDeadlineDetailsHasInterestedPartyNumber = (session, hasInterestedPartyNumber) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineHasInterestedPartyNumberKey] = hasInterestedPartyNumber;
};

module.exports = {
	deadlineHasInterestedPartyNumberKey,
	getDeadlineDetailsHasInterestedPartyNumber,
	setDeadlineDetailsHasInterestedPartyNumber
};
