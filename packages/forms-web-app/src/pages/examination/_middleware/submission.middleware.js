const {
	getExaminationSubmissionComplete,
	getExaminationUploadingState
} = require('../_session/examination-session');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { submissionComplete, submissionError }
		}
	}
} = require('../../../routes/config');

const allowableRoutes = [submissionComplete.route, submissionError.route];

const isProcessingSubmission = (req, res, next) => {
	const { url, session } = req;

	if (allowableRoutes.includes(url)) return next();

	if (getExaminationSubmissionComplete(session))
		return res.redirect(`${directory}${submissionComplete.route}`);

	if (getExaminationUploadingState(session))
		return res.status(500).render('error/unhandled-exception');

	next();
};

module.exports = {
	isProcessingSubmission
};
