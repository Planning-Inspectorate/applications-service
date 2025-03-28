const logger = require('../../../../lib/logger');
const { getProjectsIndexURL } = require('../../index/_utils/get-projects-index-url');

const checkForErrors = (session, params) => {
	if (!session.registerJourneyStarted)
		throw Error('Register start page not No registerJourneyStarted flag');
	if (!params?.case_ref) throw Error('URL - case ref is not in the URL');
	if (!session?.caseRef) throw Error('Session - case ref is not in the session');
	if (session.caseRef !== params.case_ref)
		throw Error('Session - case ref does not match the params case ref');
};

const registerMiddleware = (req, res, next) => {
	const { params, session } = req;
	try {
		checkForErrors(session, params);
		res.locals.baseUrl = getProjectsIndexURL(params.case_ref);
		// backLinkUrl has a value of '#' assigned so the link is handled by JavaScript (see default.njk)
		res.locals.backLinkUrl = '#';
		next();
	} catch (error) {
		logger.error(error);
		if (req.get('Referrer'))
			logger.info(`Referrer for error (${error.message}) - ${req.get('Referrer')}`);

		const correlationId = res.get('x-app-insights-correlation-id');

		return res.render('error/have-your-say-journey-error', { correlationId });
	}
};

module.exports = {
	registerMiddleware
};
