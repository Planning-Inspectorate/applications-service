const {
	getExaminationSubmissionComplete,
	getExaminationUploadingState
} = require('../session/examination-session');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { submissionComplete }
		}
	}
} = require('../../../routes/config');

const isProcessingSubmission = (req, res, next) => {
	const { url, session } = req;

	if (url === submissionComplete.route) return next();

	if (getExaminationSubmissionComplete(session))
		return res.redirect(`${directory}${submissionComplete.route}`);

	if (getExaminationUploadingState(session))
		return res.status(500).render('error/unhandled-exception');

	next();
};

module.exports = {
	isProcessingSubmission
};
