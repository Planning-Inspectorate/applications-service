const { getExaminationSession } = require('../session/examination-session');

const {
	routesConfig: {
		examination: {
			pages: { submissionComplete }
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');

const getSubmissionComplete = (req, res) => {
	try {
		const { session } = req;
		const examinationSession = getExaminationSession(session);

		const pageData = {
			submissionId: examinationSession.submissionId,
			projectEmail: session.appData.ProjectEmailAddress
		};

		return res.render(submissionComplete.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionComplete
};
