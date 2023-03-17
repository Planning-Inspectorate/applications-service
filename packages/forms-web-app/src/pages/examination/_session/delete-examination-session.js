const logger = require('../../../lib/logger');
const { getExaminationSession } = require('./examination-session');

const examinationKey = 'examination';

const deleteExaminationSession = (session) => {
	const { submissionId, submissionComplete, email } = getExaminationSession(session);
	const keep = {
		submissionId,
		submissionComplete,
		email
	};

	delete session[examinationKey];
	session[examinationKey] = keep;

	session.save(function (err) {
		if (err) logger.error(err);
	});
};

module.exports = {
	deleteExaminationSession
};
