const cookieConfig = require('../../../scripts/cookie/cookie-config');

const getExistingCookiePolicy = (req) => {
	let cookiePolicy = {};

	try {
		cookiePolicy =
			req.cookies &&
			req.cookies[cookieConfig.COOKIE_POLICY_KEY] &&
			JSON.parse(req.cookies[cookieConfig.COOKIE_POLICY_KEY]);
	} catch (e) {
		req.log.warn(e, 'Get cookies.');
	}

	return cookiePolicy;
};

module.exports = { getExistingCookiePolicy };
