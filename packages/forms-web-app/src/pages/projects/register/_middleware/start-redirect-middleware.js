const { getRegisterIndexURL } = require('../index/_utils/get-register-index-url');
const { buildQueryString } = require('../../../_utils/build-query-string');
const { registerRoute } = require('../config');

const registerStartRedirectMiddleware = (req, res, next) => {
	const { session, query, params } = req;
	const { case_ref } = params;

	const referrerURL = req.get('Referrer');
	const registerBaseURL = `/${registerRoute}/`;
	const withinRegisterJourney = referrerURL ? referrerURL.includes(registerBaseURL) : false;

	const indexURL = getRegisterIndexURL(case_ref);
	const queryString = Object.keys(query).length ? buildQueryString(query) : '';

	if (withinRegisterJourney && !session.registerJourneyStarted) {
		return res.status(440).render('error/have-your-say-session-expired', { indexURL });
	} else if (!session.registerJourneyStarted) {
		return res.redirect(`${indexURL}${queryString}`);
	}

	return next();
};

module.exports = { registerStartRedirectMiddleware };
