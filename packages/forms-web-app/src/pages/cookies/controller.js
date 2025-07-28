const appConfig = require('../../config');
const cookieConfig = require('../../scripts/cookie/cookie-config');
const getPreviousPagePath = require('../../lib/get-previous-page-path');
const { addFlashMessage } = require('../../lib/flash-message');
const { removeUnwantedCookies } = require('../../lib/remove-unwanted-cookies');
const { toBase64, fromBase64 } = require('../../lib/base64');
const { getExistingCookiePolicy } = require('./_utils/get-existing-cookie-policy');
const { getCookiesURL } = require('./_utils/get-cookies-url');

const view = 'cookies/view.njk';
const cookiesUpdatedMessagePath = 'cookies/_includes/cookies-updated-successfully-message.njk';
const cookiesURL = getCookiesURL();

const getCookiesController = (req, res) => {
	res.render(view, {
		cookiePolicy: getExistingCookiePolicy(req),
		displayCookieBanner: false,
		previousPagePath: toBase64(getPreviousPagePath(req))
	});
};

const postCookiesController = (req, res) => {
	const { body } = req;
	const { errors = {} } = body;

	if (Object.keys(errors).length > 0) {
		res.render(view, {
			cookiePolicy: getExistingCookiePolicy(req),
			displayCookieBanner: false
		});
		return;
	}

	if (typeof body['usage-cookies'] === 'undefined') {
		res.redirect(cookiesURL);
		return;
	}

	const existingCookiePolicy = getExistingCookiePolicy(req) || cookieConfig.DEFAULT_COOKIE_POLICY;

	const updatedCookiePolicy = {
		...existingCookiePolicy,
		usage: body['usage-cookies'] === 'on'
	};

	res.cookie(cookieConfig.COOKIE_POLICY_KEY, JSON.stringify(updatedCookiePolicy), {
		encode: String,
		expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
		secure: appConfig.isProduction
	});

	addFlashMessage(req, {
		type: 'success',
		template: {
			path: cookiesUpdatedMessagePath,
			vars: {
				previousPagePath: fromBase64(body.previous_page_path) || '/'
			}
		}
	});

	if (body['usage-cookies'] === 'off') {
		removeUnwantedCookies(req, res);
	}

	res.redirect(cookiesURL);
};

module.exports = { getCookiesController, postCookiesController };
