const {
	getExaminationSubmissionComplete,
	getExaminationUploadingState
} = require('../_session/examination-session');

const {
	routesConfig: {
		examination: {
			pages: { submissionComplete, submissionError, haveYourSay }
		}
	}
} = require('../../../routes/config');

const allowableRoutes = [submissionComplete.route, submissionError.route, haveYourSay.route];

const isProcessingSubmission = (req, res, next) => {
	const { url, session } = req;
	if (allowableRoutes.includes(url.replace('/', ''))) return next();

	if (getExaminationSubmissionComplete(session)) return res.redirect(`${submissionComplete.route}`);

	if (getExaminationUploadingState(session))
		return res.status(500).render('error/unhandled-exception');
	next();
};

module.exports = {
	isProcessingSubmission
};
