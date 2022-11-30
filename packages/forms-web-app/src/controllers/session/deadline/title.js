const { getExaminationSession } = require('../../examination/session/examination-session');

const deadlineTitleKey = 'title';

const getDeadlineTitle = (session) => {
	const examinationSession = getExaminationSession(session);

	if (!examinationSession?.[deadlineTitleKey]) throw new Error('Deadline title not found');

	return examinationSession[deadlineTitleKey];
};

const setDeadlineTitle = (session, title) => {
	const examinationSession = getExaminationSession(session);

	examinationSession[deadlineTitleKey] = title;
};

module.exports = { getDeadlineTitle, setDeadlineTitle };
