const { getExaminationSession } = require('../../examination-session');

const details = 'details';
const editDetails = 'editDetails';

const getDetailsMode = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession.detailsMode) throw new Error('details mode not found');

	return examinationSession.detailsMode;
};

const setDetailsMode = (session, detailsMode) => {
	const examinationSession = getExaminationSession(session);

	examinationSession.detailsMode = detailsMode ? details : editDetails;
};

module.exports = { getDetailsMode, setDetailsMode };
