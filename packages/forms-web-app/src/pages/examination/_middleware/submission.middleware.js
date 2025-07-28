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
		/*
			Rebuild queryString to main lang value to avoid conflict with i18n middleware which causes redirect loop
			* This happens due to i18n middleware detecting the absence of a lang value but the cookie value being set to cy so a redirect is
			made to the requested URL with a query string which again hit the examination middleware causing a loop.
		*/
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
