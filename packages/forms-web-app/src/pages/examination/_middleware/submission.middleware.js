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
const { buildQueryString } = require('../../_utils/build-query-string');

const allowableRoutes = [submissionComplete.route, submissionError.route, haveYourSay.route];

const isProcessingSubmission = (req, res, next) => {
	const { query, path, session } = req;

	if (allowableRoutes.includes(path.replace('/', ''))) return next();

	if (getExaminationSubmissionComplete(session)) {
		const queryString = Object.keys(query).length ? buildQueryString(query) : '';
		return res.redirect(`${submissionComplete.route}${queryString}`);
	}

	if (getExaminationUploadingState(session))
		return res.status(500).render('error/unhandled-exception');

	next();
};

module.exports = {
	isProcessingSubmission
};
