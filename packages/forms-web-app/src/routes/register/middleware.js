const logger = require('../../lib/logger');
const { getSiteBackLinkURL } = require('../../pages/_utils/get-site-back-link-url');
const { getProjectsIndexURL } = require('../../pages/projects/index/_utils/get-projects-index-url');
const {
	getRegisterIndexURL
} = require('../../pages/projects/register/index/_utils/get-register-index-url');

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
		const referrer = req.get('Referrer');
		res.locals.baseUrl = getProjectsIndexURL(params.case_ref);
		res.locals.backLinkUrl = getSiteBackLinkURL(referrer);
		next();
	} catch (error) {
		logger.error(error);
		if (req.get('Referrer'))
			logger.info(`Referrer for error (${error.message}) - ${req.get('Referrer')}`);
		return res.render('error/register-journey-error.njk', {
			detailsLink: getRegisterIndexURL(params.case_ref)
		});
	}
};

module.exports = {
	registerMiddleware
};
