const { getExaminationSession } = require('../examination-session');
const { getDetailsMode } = require('./utils/get-details-mode');

const getDeadlineHasInterestedPartyNumber = (session) => {
	const examinationSessionDetails = getExaminationSession(session)[getDetailsMode(session)];

	if (!examinationSessionDetails.hasInterestedPartyNumber)
		throw new Error('Deadline interested party number not found');

	return examinationSessionDetails.hasInterestedPartyNumber;
};

const setDeadlineHasInterestedPartyNumber = (session, hasInterestedPartyNumber) => {
	const examinationSessionDetails = getExaminationSession(session)[getDetailsMode(session)];

	examinationSessionDetails.hasInterestedPartyNumber = hasInterestedPartyNumber;
};

module.exports = { getDeadlineHasInterestedPartyNumber, setDeadlineHasInterestedPartyNumber };
