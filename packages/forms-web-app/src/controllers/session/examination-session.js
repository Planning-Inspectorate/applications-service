const getExaminationSession = (session) => {
	const examinationSession = session?.examination;
	if (!examinationSession) throw new Error('No examination session');
	return examinationSession;
};

const setExaminationSession = (session) => {
	if (!session?.examination) session.examination = {};
};

const deleteExaminationSession = (session) => {
	delete session.examination;
};

module.exports = {
	getExaminationSession,
	setExaminationSession,
	deleteExaminationSession
};
