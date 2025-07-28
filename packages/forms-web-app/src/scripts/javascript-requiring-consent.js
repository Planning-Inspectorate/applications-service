/* eslint-env browser */
/* istanbul ignore file */

const { readCookie } = require('./cookie/cookie-jar');
const cookieConfig = require('./cookie/cookie-config');
const { initialiseGoogleAnalytics } = require('./google-analytics');

const initialiseOptionalJavaScripts = (document) => {
	const cookie = readCookie(document, cookieConfig.COOKIE_POLICY_KEY);

	if (cookie === null) {
		// eslint-disable-next-line no-console
		console.log('Consent not yet given for optional JavaScripts.');
		return;
	}

	try {
		const parsed = JSON.parse(cookie);

		if (!parsed || typeof parsed.usage === 'undefined') return;
		else if (parsed.usage === true) {
			return initialiseGoogleAnalytics(document);
		} else console.log('Declined consent. Third party cookies are not enabled.');
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Unable to decode the value of cookie', e);
	}
};

module.exports = {
	initialiseOptionalJavaScripts
};
