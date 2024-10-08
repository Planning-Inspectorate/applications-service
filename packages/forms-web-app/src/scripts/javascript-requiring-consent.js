/* eslint-env browser */
/* istanbul ignore file */

const { readCookie } = require('./cookie/cookie-jar');
const cookieConfig = require('./cookie/cookie-config');
const googleTagManager = require('./google-tag-manager');

const initialiseOptionalJavaScripts = (document) => {
	const cookie = readCookie(document, cookieConfig.COOKIE_POLICY_KEY);

	if (cookie === null) {
		// eslint-disable-next-line no-console
		console.log('Consent not yet given for optional JavaScripts.');
		return;
	}

	try {
		const parsed = JSON.parse(cookie);
		const allowGTM = process.env.googleTagManager && process.env.googleTagManagerId;

		if (!parsed || typeof parsed.usage === 'undefined') return;
		else if (parsed.usage === false) {
			if (allowGTM) googleTagManager.denyConsent();

			console.log('Declined consent. Third party cookies are not enabled.');

			return;
		} else if (allowGTM) googleTagManager.grantConsent();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Unable to decode the value of cookie', e);
	}
};

module.exports = {
	initialiseOptionalJavaScripts
};
