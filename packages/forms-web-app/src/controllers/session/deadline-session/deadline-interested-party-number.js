const { getExaminationSession } = require('../examination-session');
const { getDetailsMode } = require('./utils/get-details-mode');

const getDeadlineInterestedPartyNumber = (session) => {
	const examinationSessionDetails = getExaminationSession(session)[getDetailsMode(session)];

	if (!examinationSessionDetails.interestedPartyNumber)
		throw new Error('Deadline interested party number not found');

	return examinationSessionDetails.interestedPartyNumber;
};

const setDeadlineInterestedPartyNumber = (session, interestedPartyNumber) => {
	const examinationSessionDetails = getExaminationSession(session)[getDetailsMode(session)];

	examinationSessionDetails.interestedPartyNumber = interestedPartyNumber;
};

module.exports = { getDeadlineInterestedPartyNumber, setDeadlineInterestedPartyNumber };
