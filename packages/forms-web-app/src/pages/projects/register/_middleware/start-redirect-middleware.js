const { getRegisterIndexURL } = require('../index/_utils/get-register-index-url');
const { buildQueryString } = require('../../../_utils/build-query-string');

const registerStartRedirectMiddleware = (req, res, next) => {
	const { session, query, params } = req;
	const { case_ref } = params;

	const registerIndexURL = getRegisterIndexURL(case_ref);
	const queryString = Object.keys(query).length ? buildQueryString(query) : '';

	if (!session.registerJourneyStarted) {
		return res.redirect(`${registerIndexURL}${queryString}`);
	}

	return next();
};

module.exports = { registerStartRedirectMiddleware };
