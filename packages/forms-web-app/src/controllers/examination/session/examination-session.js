const getExaminationSession = (session) => {
	const examinationSession = session?.examination;
	if (!examinationSession) throw new Error('No examination session');
	return examinationSession;
};

module.exports = {
	getExaminationSession
};
