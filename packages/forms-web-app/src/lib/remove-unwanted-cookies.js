const cookieConfig = require('../scripts/cookie/cookie-config');
const { localesQueryCookieID } = require('../locales/config');
const { EASY_AUTH } = require('../consts');

const {
	extractRootDomainNameFromHostnameAndSubdomains
} = require('./extract-root-domain-name-from-full-domain-name');

const defaultKeepMeCookies = [
	'connect.sid',
	cookieConfig.COOKIE_POLICY_KEY,
	localesQueryCookieID,
	'ARRAffinity',
	'ARRAffinitySameSite',
	EASY_AUTH.EASY_AUTH_COOKIE_NAME,
	EASY_AUTH.SESSION_COOKIE_NAME
];

/**
 * This is a brute force attempt at removing any unwanted cookies.
 *
 * Whilst intentionally generic, this is primarily aimed at removing Google Analytics cookies
 * after the visitor already accepted, but subsequently declined the 'usage' cookie policy.
 *
 * GA cookies are set against the root domain, and do not appear to be marked secure.
 *
 * @param req
 * @param res
 * @param keepTheseCookies
 */
const removeUnwantedCookies = (req, res, keepTheseCookies = defaultKeepMeCookies) => {
	const domain = extractRootDomainNameFromHostnameAndSubdomains(req.hostname, req.subdomains);

	Object.keys(req.cookies)
		.filter((cookieName) => keepTheseCookies.includes(cookieName) === false)
		.forEach((cookieName) => {
			res.clearCookie(cookieName);
			res.clearCookie(cookieName, { domain: `.${domain}`, secure: true });
			res.clearCookie(cookieName, { domain: `.${domain}`, secure: false });
		});
};

module.exports = {
	defaultKeepMeCookies,
	removeUnwantedCookies
};
