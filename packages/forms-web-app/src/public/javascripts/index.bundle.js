/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/client-side/cookie/cookie-config.js":
/*!*****************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-config.js ***!
  \*****************************************************/
/***/ ((module) => {

const COOKIE_POLICY_KEY = 'cookie_policy';

const CSS_CLASSES = {
	displayNone: 'govuk-!-display-none'
};

const DEFAULT_COOKIE_POLICY = {
	essential: true,
	settings: false,
	usage: false,
	campaigns: false
};

const SELECTORS = {
	button: {
		cookieBanner: {
			consent: 'button[name="cookie_banner"]',
			accepted: 'button[name="cookie_banner_accepted"]',
			rejected: 'button[name="cookie_banner_rejected"]'
		}
	},
	cookieBanner: {
		consent: '#cookie-banner-consent',
		accepted: '#cookie-banner-accepted',
		rejected: '#cookie-banner-rejected'
	}
};

module.exports = {
	COOKIE_POLICY_KEY,
	CSS_CLASSES,
	DEFAULT_COOKIE_POLICY,
	SELECTORS
};


/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent-accepted.js":
/*!***************************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent-accepted.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-env browser */

const cookieConfig = __webpack_require__(/*! ./cookie-config */ "./src/lib/client-side/cookie/cookie-config.js");
const {
	hideSingleDomElementBySelector,
	showSingleDomElementBySelector
} = __webpack_require__(/*! ./cookie-dom-helpers */ "./src/lib/client-side/cookie/cookie-dom-helpers.js");

const hideConsentAcceptedBanner = (document) =>
	hideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.accepted);

const addCookieConsentAcceptedListener = (document) => {
	const acknowledgeCookieConsentAcceptedButton = document.querySelector(
		cookieConfig.SELECTORS.button.cookieBanner.accepted
	);

	const handler = () => {
		hideConsentAcceptedBanner(document);
		acknowledgeCookieConsentAcceptedButton.removeEventListener('click', handler);
	};

	acknowledgeCookieConsentAcceptedButton.addEventListener('click', handler, false);
};

const showCookieConsentAcceptedBanner = (document) => {
	showSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.accepted);
	addCookieConsentAcceptedListener(document);
};

module.exports = {
	addCookieConsentAcceptedListener,
	hideConsentAcceptedBanner,
	showCookieConsentAcceptedBanner
};


/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent-rejected.js":
/*!***************************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent-rejected.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-env browser */

const cookieConfig = __webpack_require__(/*! ./cookie-config */ "./src/lib/client-side/cookie/cookie-config.js");
const {
	hideSingleDomElementBySelector,
	showSingleDomElementBySelector
} = __webpack_require__(/*! ./cookie-dom-helpers */ "./src/lib/client-side/cookie/cookie-dom-helpers.js");

const hideConsentRejectedBanner = (document) =>
	hideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.rejected);

const addCookieConsentRejectedListener = (document) => {
	const acknowledgeCookieConsentRejectedButton = document.querySelector(
		cookieConfig.SELECTORS.button.cookieBanner.rejected
	);

	const handler = () => {
		hideConsentRejectedBanner(document);
		acknowledgeCookieConsentRejectedButton.removeEventListener('click', handler);
	};

	acknowledgeCookieConsentRejectedButton.addEventListener('click', handler, false);
};

const showCookieConsentRejectedBanner = (document) => {
	showSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.rejected);
	addCookieConsentRejectedListener(document);
};

module.exports = {
	addCookieConsentRejectedListener,
	hideConsentRejectedBanner,
	showCookieConsentRejectedBanner
};


/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent.js":
/*!******************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-env browser */

const cookieConfig = __webpack_require__(/*! ./cookie-config */ "./src/lib/client-side/cookie/cookie-config.js");
const { createCookie, eraseCookie, readCookie } = __webpack_require__(/*! ./cookie-jar */ "./src/lib/client-side/cookie/cookie-jar.js");
const { hideSingleDomElementBySelector } = __webpack_require__(/*! ./cookie-dom-helpers */ "./src/lib/client-side/cookie/cookie-dom-helpers.js");
const { showCookieConsentAcceptedBanner } = __webpack_require__(/*! ./cookie-consent-accepted */ "./src/lib/client-side/cookie/cookie-consent-accepted.js");
const { showCookieConsentRejectedBanner } = __webpack_require__(/*! ./cookie-consent-rejected */ "./src/lib/client-side/cookie/cookie-consent-rejected.js");
const { initialiseOptionalJavaScripts } = __webpack_require__(/*! ../javascript-requiring-consent */ "./src/lib/client-side/javascript-requiring-consent.js");

const setCookies = (document, cookiePolicy) => {
	eraseCookie(document, cookieConfig.COOKIE_POLICY_KEY);
	createCookie(document, cookieConfig.COOKIE_POLICY_KEY, JSON.stringify(cookiePolicy));
};

const hideConsentBanner = (document) =>
	hideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.consent);

const getConsentButtons = (document) => {
	const selector = cookieConfig.SELECTORS.button.cookieBanner.consent;

	const allConsentButtons = document.querySelectorAll(selector);
	const acceptCookieConsentButton = document.querySelector(`${selector}[value="accept"]`);
	const rejectCookieConsentButton = document.querySelector(`${selector}[value="reject"]`);

	return {
		allConsentButtons,
		acceptCookieConsentButton,
		rejectCookieConsentButton
	};
};

const displayConsentButtons = (consentButtons) =>
	consentButtons.forEach((button) => button.classList.remove(cookieConfig.CSS_CLASSES.displayNone));

const addAcceptCookieConsentListener = (document, acceptCookieConsentButton) => {
	const handler = () => {
		setCookies(document, {
			...cookieConfig.DEFAULT_COOKIE_POLICY,
			usage: true
		});
		hideConsentBanner(document);
		acceptCookieConsentButton.removeEventListener('click', handler);
		showCookieConsentAcceptedBanner(document);
		initialiseOptionalJavaScripts(document);
	};

	acceptCookieConsentButton.addEventListener('click', handler, false);
};

const addRejectCookieConsentListener = (document, rejectCookieConsentButton) => {
	const handler = () => {
		setCookies(document, cookieConfig.DEFAULT_COOKIE_POLICY);
		hideConsentBanner(document);
		rejectCookieConsentButton.removeEventListener('click', handler);
		showCookieConsentRejectedBanner(document);
	};

	rejectCookieConsentButton.addEventListener('click', handler, false);
};

const cookieConsentHandler = (document) => {
	const { allConsentButtons, acceptCookieConsentButton, rejectCookieConsentButton } =
		getConsentButtons(document);

	if (!acceptCookieConsentButton || !rejectCookieConsentButton) {
		return;
	}

	if (readCookie(document, cookieConfig.COOKIE_POLICY_KEY) !== null) {
		hideConsentBanner(document);
		return;
	}

	addAcceptCookieConsentListener(document, acceptCookieConsentButton);
	addRejectCookieConsentListener(document, rejectCookieConsentButton);

	displayConsentButtons(allConsentButtons);
};

module.exports = {
	addRejectCookieConsentListener,
	addAcceptCookieConsentListener,
	cookieConsentHandler,
	displayConsentButtons,
	getConsentButtons,
	hideConsentBanner,
	setCookies
};


/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-dom-helpers.js":
/*!**********************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-dom-helpers.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-env browser */

const cookieConfig = __webpack_require__(/*! ./cookie-config */ "./src/lib/client-side/cookie/cookie-config.js");

const showSingleDomElementBySelector = (document, selector) =>
	document.querySelector(selector).classList.remove(cookieConfig.CSS_CLASSES.displayNone);

const hideSingleDomElementBySelector = (document, selector) =>
	document.querySelector(selector).classList.add(cookieConfig.CSS_CLASSES.displayNone);

module.exports = {
	showSingleDomElementBySelector,
	hideSingleDomElementBySelector
};


/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-jar.js":
/*!**************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-jar.js ***!
  \**************************************************/
/***/ ((module) => {

/* eslint-env browser */

// https://www.quirksmode.org/js/cookies.html

const createCookie = (document, name, value, days = 365) => {
	let expires = '';
	if (typeof days === 'number') {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	let secure = '';
	// eslint-disable-next-line no-unused-vars
	/* global process.env.NODE_ENV */
	if (false) {}
	// eslint-disable-next-line no-param-reassign
	document.cookie = `${name}=${value}${expires}${secure}; path=/`;
};

const readCookie = (document, name) => {
	const nameEQ = `${name}=`;
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i += 1) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
};

const eraseCookie = (document, name) => {
	createCookie(document, name, '', -1);
};

module.exports = {
	createCookie,
	readCookie,
	eraseCookie
};


/***/ }),

/***/ "./src/lib/client-side/google-analytics.js":
/*!*************************************************!*\
  !*** ./src/lib/client-side/google-analytics.js ***!
  \*************************************************/
/***/ ((module) => {

/* eslint-env browser */

const initialiseGoogleAnalytics = (document) => {
	const gaId = document.getElementById('gaId') ? document.getElementById('gaId').textContent : null;

	function gtag() {
		// eslint-disable-next-line no-undef, prefer-rest-params
		dataLayer.push(arguments);
	}

	if (gaId) {
		const gaScript = document.createElement('script');
		gaScript.type = 'text/javascript';
		gaScript.async = true;
		gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

		const firstScriptElement = document.getElementsByTagName('script')[0];
		firstScriptElement.parentNode.insertBefore(gaScript, firstScriptElement);

		window.dataLayer = window.dataLayer || [];

		gtag('js', new Date());
		gtag('config', gaId);
	}
};

module.exports = {
	initialiseGoogleAnalytics
};


/***/ }),

/***/ "./src/lib/client-side/google-tag-manager.js":
/*!***************************************************!*\
  !*** ./src/lib/client-side/google-tag-manager.js ***!
  \***************************************************/
/***/ ((module) => {

/* eslint-env browser */

function applyConsent(consent) {
	window.dataLayer = window.dataLayer || [];

	function gtag() {
		// eslint-disable-next-line no-undef, prefer-rest-params
		dataLayer.push(arguments);
	}

	/* istanbul ignore else */
	if (consent === 'denied' || consent === 'granted') {
		gtag('consent', 'update', {
			analytics_storage: consent // We only care about analytics_storage
		});
	}
}

const denyConsent = () => {
	applyConsent('denied');
};

const grantConsent = () => {
	applyConsent('granted');
};

module.exports = {
	grantConsent,
	denyConsent
};


/***/ }),

/***/ "./src/lib/client-side/javascript-requiring-consent.js":
/*!*************************************************************!*\
  !*** ./src/lib/client-side/javascript-requiring-consent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-env browser */
/* istanbul ignore file */

const { readCookie } = __webpack_require__(/*! ./cookie/cookie-jar */ "./src/lib/client-side/cookie/cookie-jar.js");
const cookieConfig = __webpack_require__(/*! ./cookie/cookie-config */ "./src/lib/client-side/cookie/cookie-config.js");
const { initialiseGoogleAnalytics } = __webpack_require__(/*! ./google-analytics */ "./src/lib/client-side/google-analytics.js");
const googleTagManager = __webpack_require__(/*! ./google-tag-manager */ "./src/lib/client-side/google-tag-manager.js");

const initialiseOptionalJavaScripts = (document) => {
	const cookie = readCookie(document, cookieConfig.COOKIE_POLICY_KEY);

	if (cookie === null) {
		// eslint-disable-next-line no-console
		console.log('Consent not yet given for optional JavaScripts.');
		return;
	}

	try {
		const parsed = JSON.parse(cookie);

		if (!parsed || typeof parsed.usage === 'undefined') {
			return;
		}

		if (parsed.usage === false) {
			// eslint-disable-next-line no-console
			console.log('Declined consent. Third party cookies are not enabled.');

			if (false) {}
			return;
		}

		if (false) {} else {
			initialiseGoogleAnalytics(document);
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Unable to decode the value of cookie', e);
	}
};

module.exports = {
	initialiseOptionalJavaScripts
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/lib/client-side/index.js ***!
  \**************************************/
/* eslint-env browser */

const { cookieConsentHandler } = __webpack_require__(/*! ./cookie/cookie-consent */ "./src/lib/client-side/cookie/cookie-consent.js");
const { initialiseOptionalJavaScripts } = __webpack_require__(/*! ./javascript-requiring-consent */ "./src/lib/client-side/javascript-requiring-consent.js");

cookieConsentHandler(document);
initialiseOptionalJavaScripts(document);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7O0FBRUEsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDcEQscUJBQXFCLG1CQUFPLENBQUMsNkVBQXdCO0FBQ3JELFFBQVEsNEJBQTRCLEVBQUUsbUJBQU8sQ0FBQyxxRUFBb0I7QUFDbEUseUJBQXlCLG1CQUFPLENBQUMseUVBQXNCOztBQUV2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU8sS0FBOEQsRUFBRSxFQUVuRTtBQUNKO0FBQ0E7O0FBRUEsTUFBTSxLQUE4RCxFQUFFLEVBRW5FLENBQUM7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQy9DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7O0FBRUEsUUFBUSx1QkFBdUIsRUFBRSxtQkFBTyxDQUFDLCtFQUF5QjtBQUNsRSxRQUFRLGdDQUFnQyxFQUFFLG1CQUFPLENBQUMsNkZBQWdDOztBQUVsRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1jb25maWcuanMiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1jb25zZW50LWFjY2VwdGVkLmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS9jb29raWUtY29uc2VudC1yZWplY3RlZC5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9jb29raWUvY29va2llLWNvbnNlbnQuanMiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1kb20taGVscGVycy5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9jb29raWUvY29va2llLWphci5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9nb29nbGUtYW5hbHl0aWNzLmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2dvb2dsZS10YWctbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9qYXZhc2NyaXB0LXJlcXVpcmluZy1jb25zZW50LmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ09PS0lFX1BPTElDWV9LRVkgPSAnY29va2llX3BvbGljeSc7XG5cbmNvbnN0IENTU19DTEFTU0VTID0ge1xuXHRkaXNwbGF5Tm9uZTogJ2dvdnVrLSEtZGlzcGxheS1ub25lJ1xufTtcblxuY29uc3QgREVGQVVMVF9DT09LSUVfUE9MSUNZID0ge1xuXHRlc3NlbnRpYWw6IHRydWUsXG5cdHNldHRpbmdzOiBmYWxzZSxcblx0dXNhZ2U6IGZhbHNlLFxuXHRjYW1wYWlnbnM6IGZhbHNlXG59O1xuXG5jb25zdCBTRUxFQ1RPUlMgPSB7XG5cdGJ1dHRvbjoge1xuXHRcdGNvb2tpZUJhbm5lcjoge1xuXHRcdFx0Y29uc2VudDogJ2J1dHRvbltuYW1lPVwiY29va2llX2Jhbm5lclwiXScsXG5cdFx0XHRhY2NlcHRlZDogJ2J1dHRvbltuYW1lPVwiY29va2llX2Jhbm5lcl9hY2NlcHRlZFwiXScsXG5cdFx0XHRyZWplY3RlZDogJ2J1dHRvbltuYW1lPVwiY29va2llX2Jhbm5lcl9yZWplY3RlZFwiXSdcblx0XHR9XG5cdH0sXG5cdGNvb2tpZUJhbm5lcjoge1xuXHRcdGNvbnNlbnQ6ICcjY29va2llLWJhbm5lci1jb25zZW50Jyxcblx0XHRhY2NlcHRlZDogJyNjb29raWUtYmFubmVyLWFjY2VwdGVkJyxcblx0XHRyZWplY3RlZDogJyNjb29raWUtYmFubmVyLXJlamVjdGVkJ1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Q09PS0lFX1BPTElDWV9LRVksXG5cdENTU19DTEFTU0VTLFxuXHRERUZBVUxUX0NPT0tJRV9QT0xJQ1ksXG5cdFNFTEVDVE9SU1xufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25maWcnKTtcbmNvbnN0IHtcblx0aGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yLFxuXHRzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3Jcbn0gPSByZXF1aXJlKCcuL2Nvb2tpZS1kb20taGVscGVycycpO1xuXG5jb25zdCBoaWRlQ29uc2VudEFjY2VwdGVkQmFubmVyID0gKGRvY3VtZW50KSA9PlxuXHRoaWRlU2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5TRUxFQ1RPUlMuY29va2llQmFubmVyLmFjY2VwdGVkKTtcblxuY29uc3QgYWRkQ29va2llQ29uc2VudEFjY2VwdGVkTGlzdGVuZXIgPSAoZG9jdW1lbnQpID0+IHtcblx0Y29uc3QgYWNrbm93bGVkZ2VDb29raWVDb25zZW50QWNjZXB0ZWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdGNvb2tpZUNvbmZpZy5TRUxFQ1RPUlMuYnV0dG9uLmNvb2tpZUJhbm5lci5hY2NlcHRlZFxuXHQpO1xuXG5cdGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XG5cdFx0aGlkZUNvbnNlbnRBY2NlcHRlZEJhbm5lcihkb2N1bWVudCk7XG5cdFx0YWNrbm93bGVkZ2VDb29raWVDb25zZW50QWNjZXB0ZWRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcblx0fTtcblxuXHRhY2tub3dsZWRnZUNvb2tpZUNvbnNlbnRBY2NlcHRlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIsIGZhbHNlKTtcbn07XG5cbmNvbnN0IHNob3dDb29raWVDb25zZW50QWNjZXB0ZWRCYW5uZXIgPSAoZG9jdW1lbnQpID0+IHtcblx0c2hvd1NpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yKGRvY3VtZW50LCBjb29raWVDb25maWcuU0VMRUNUT1JTLmNvb2tpZUJhbm5lci5hY2NlcHRlZCk7XG5cdGFkZENvb2tpZUNvbnNlbnRBY2NlcHRlZExpc3RlbmVyKGRvY3VtZW50KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhZGRDb29raWVDb25zZW50QWNjZXB0ZWRMaXN0ZW5lcixcblx0aGlkZUNvbnNlbnRBY2NlcHRlZEJhbm5lcixcblx0c2hvd0Nvb2tpZUNvbnNlbnRBY2NlcHRlZEJhbm5lclxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25maWcnKTtcbmNvbnN0IHtcblx0aGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yLFxuXHRzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3Jcbn0gPSByZXF1aXJlKCcuL2Nvb2tpZS1kb20taGVscGVycycpO1xuXG5jb25zdCBoaWRlQ29uc2VudFJlamVjdGVkQmFubmVyID0gKGRvY3VtZW50KSA9PlxuXHRoaWRlU2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5TRUxFQ1RPUlMuY29va2llQmFubmVyLnJlamVjdGVkKTtcblxuY29uc3QgYWRkQ29va2llQ29uc2VudFJlamVjdGVkTGlzdGVuZXIgPSAoZG9jdW1lbnQpID0+IHtcblx0Y29uc3QgYWNrbm93bGVkZ2VDb29raWVDb25zZW50UmVqZWN0ZWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdGNvb2tpZUNvbmZpZy5TRUxFQ1RPUlMuYnV0dG9uLmNvb2tpZUJhbm5lci5yZWplY3RlZFxuXHQpO1xuXG5cdGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XG5cdFx0aGlkZUNvbnNlbnRSZWplY3RlZEJhbm5lcihkb2N1bWVudCk7XG5cdFx0YWNrbm93bGVkZ2VDb29raWVDb25zZW50UmVqZWN0ZWRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcblx0fTtcblxuXHRhY2tub3dsZWRnZUNvb2tpZUNvbnNlbnRSZWplY3RlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIsIGZhbHNlKTtcbn07XG5cbmNvbnN0IHNob3dDb29raWVDb25zZW50UmVqZWN0ZWRCYW5uZXIgPSAoZG9jdW1lbnQpID0+IHtcblx0c2hvd1NpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yKGRvY3VtZW50LCBjb29raWVDb25maWcuU0VMRUNUT1JTLmNvb2tpZUJhbm5lci5yZWplY3RlZCk7XG5cdGFkZENvb2tpZUNvbnNlbnRSZWplY3RlZExpc3RlbmVyKGRvY3VtZW50KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhZGRDb29raWVDb25zZW50UmVqZWN0ZWRMaXN0ZW5lcixcblx0aGlkZUNvbnNlbnRSZWplY3RlZEJhbm5lcixcblx0c2hvd0Nvb2tpZUNvbnNlbnRSZWplY3RlZEJhbm5lclxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25maWcnKTtcbmNvbnN0IHsgY3JlYXRlQ29va2llLCBlcmFzZUNvb2tpZSwgcmVhZENvb2tpZSB9ID0gcmVxdWlyZSgnLi9jb29raWUtamFyJyk7XG5jb25zdCB7IGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3RvciB9ID0gcmVxdWlyZSgnLi9jb29raWUtZG9tLWhlbHBlcnMnKTtcbmNvbnN0IHsgc2hvd0Nvb2tpZUNvbnNlbnRBY2NlcHRlZEJhbm5lciB9ID0gcmVxdWlyZSgnLi9jb29raWUtY29uc2VudC1hY2NlcHRlZCcpO1xuY29uc3QgeyBzaG93Q29va2llQ29uc2VudFJlamVjdGVkQmFubmVyIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25zZW50LXJlamVjdGVkJyk7XG5jb25zdCB7IGluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzIH0gPSByZXF1aXJlKCcuLi9qYXZhc2NyaXB0LXJlcXVpcmluZy1jb25zZW50Jyk7XG5cbmNvbnN0IHNldENvb2tpZXMgPSAoZG9jdW1lbnQsIGNvb2tpZVBvbGljeSkgPT4ge1xuXHRlcmFzZUNvb2tpZShkb2N1bWVudCwgY29va2llQ29uZmlnLkNPT0tJRV9QT0xJQ1lfS0VZKTtcblx0Y3JlYXRlQ29va2llKGRvY3VtZW50LCBjb29raWVDb25maWcuQ09PS0lFX1BPTElDWV9LRVksIEpTT04uc3RyaW5naWZ5KGNvb2tpZVBvbGljeSkpO1xufTtcblxuY29uc3QgaGlkZUNvbnNlbnRCYW5uZXIgPSAoZG9jdW1lbnQpID0+XG5cdGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3Rvcihkb2N1bWVudCwgY29va2llQ29uZmlnLlNFTEVDVE9SUy5jb29raWVCYW5uZXIuY29uc2VudCk7XG5cbmNvbnN0IGdldENvbnNlbnRCdXR0b25zID0gKGRvY3VtZW50KSA9PiB7XG5cdGNvbnN0IHNlbGVjdG9yID0gY29va2llQ29uZmlnLlNFTEVDVE9SUy5idXR0b24uY29va2llQmFubmVyLmNvbnNlbnQ7XG5cblx0Y29uc3QgYWxsQ29uc2VudEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0Y29uc3QgYWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c2VsZWN0b3J9W3ZhbHVlPVwiYWNjZXB0XCJdYCk7XG5cdGNvbnN0IHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yfVt2YWx1ZT1cInJlamVjdFwiXWApO1xuXG5cdHJldHVybiB7XG5cdFx0YWxsQ29uc2VudEJ1dHRvbnMsXG5cdFx0YWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbixcblx0XHRyZWplY3RDb29raWVDb25zZW50QnV0dG9uXG5cdH07XG59O1xuXG5jb25zdCBkaXNwbGF5Q29uc2VudEJ1dHRvbnMgPSAoY29uc2VudEJ1dHRvbnMpID0+XG5cdGNvbnNlbnRCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoY29va2llQ29uZmlnLkNTU19DTEFTU0VTLmRpc3BsYXlOb25lKSk7XG5cbmNvbnN0IGFkZEFjY2VwdENvb2tpZUNvbnNlbnRMaXN0ZW5lciA9IChkb2N1bWVudCwgYWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbikgPT4ge1xuXHRjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuXHRcdHNldENvb2tpZXMoZG9jdW1lbnQsIHtcblx0XHRcdC4uLmNvb2tpZUNvbmZpZy5ERUZBVUxUX0NPT0tJRV9QT0xJQ1ksXG5cdFx0XHR1c2FnZTogdHJ1ZVxuXHRcdH0pO1xuXHRcdGhpZGVDb25zZW50QmFubmVyKGRvY3VtZW50KTtcblx0XHRhY2NlcHRDb29raWVDb25zZW50QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2hvd0Nvb2tpZUNvbnNlbnRBY2NlcHRlZEJhbm5lcihkb2N1bWVudCk7XG5cdFx0aW5pdGlhbGlzZU9wdGlvbmFsSmF2YVNjcmlwdHMoZG9jdW1lbnQpO1xuXHR9O1xuXG5cdGFjY2VwdENvb2tpZUNvbnNlbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyLCBmYWxzZSk7XG59O1xuXG5jb25zdCBhZGRSZWplY3RDb29raWVDb25zZW50TGlzdGVuZXIgPSAoZG9jdW1lbnQsIHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24pID0+IHtcblx0Y29uc3QgaGFuZGxlciA9ICgpID0+IHtcblx0XHRzZXRDb29raWVzKGRvY3VtZW50LCBjb29raWVDb25maWcuREVGQVVMVF9DT09LSUVfUE9MSUNZKTtcblx0XHRoaWRlQ29uc2VudEJhbm5lcihkb2N1bWVudCk7XG5cdFx0cmVqZWN0Q29va2llQ29uc2VudEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNob3dDb29raWVDb25zZW50UmVqZWN0ZWRCYW5uZXIoZG9jdW1lbnQpO1xuXHR9O1xuXG5cdHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyLCBmYWxzZSk7XG59O1xuXG5jb25zdCBjb29raWVDb25zZW50SGFuZGxlciA9IChkb2N1bWVudCkgPT4ge1xuXHRjb25zdCB7IGFsbENvbnNlbnRCdXR0b25zLCBhY2NlcHRDb29raWVDb25zZW50QnV0dG9uLCByZWplY3RDb29raWVDb25zZW50QnV0dG9uIH0gPVxuXHRcdGdldENvbnNlbnRCdXR0b25zKGRvY3VtZW50KTtcblxuXHRpZiAoIWFjY2VwdENvb2tpZUNvbnNlbnRCdXR0b24gfHwgIXJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAocmVhZENvb2tpZShkb2N1bWVudCwgY29va2llQ29uZmlnLkNPT0tJRV9QT0xJQ1lfS0VZKSAhPT0gbnVsbCkge1xuXHRcdGhpZGVDb25zZW50QmFubmVyKGRvY3VtZW50KTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRhZGRBY2NlcHRDb29raWVDb25zZW50TGlzdGVuZXIoZG9jdW1lbnQsIGFjY2VwdENvb2tpZUNvbnNlbnRCdXR0b24pO1xuXHRhZGRSZWplY3RDb29raWVDb25zZW50TGlzdGVuZXIoZG9jdW1lbnQsIHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24pO1xuXG5cdGRpc3BsYXlDb25zZW50QnV0dG9ucyhhbGxDb25zZW50QnV0dG9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0YWRkUmVqZWN0Q29va2llQ29uc2VudExpc3RlbmVyLFxuXHRhZGRBY2NlcHRDb29raWVDb25zZW50TGlzdGVuZXIsXG5cdGNvb2tpZUNvbnNlbnRIYW5kbGVyLFxuXHRkaXNwbGF5Q29uc2VudEJ1dHRvbnMsXG5cdGdldENvbnNlbnRCdXR0b25zLFxuXHRoaWRlQ29uc2VudEJhbm5lcixcblx0c2V0Q29va2llc1xufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25maWcnKTtcblxuY29uc3Qgc2hvd1NpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yID0gKGRvY3VtZW50LCBzZWxlY3RvcikgPT5cblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikuY2xhc3NMaXN0LnJlbW92ZShjb29raWVDb25maWcuQ1NTX0NMQVNTRVMuZGlzcGxheU5vbmUpO1xuXG5jb25zdCBoaWRlU2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IgPSAoZG9jdW1lbnQsIHNlbGVjdG9yKSA9PlxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5jbGFzc0xpc3QuYWRkKGNvb2tpZUNvbmZpZy5DU1NfQ0xBU1NFUy5kaXNwbGF5Tm9uZSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IsXG5cdGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3RvclxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9qcy9jb29raWVzLmh0bWxcblxuY29uc3QgY3JlYXRlQ29va2llID0gKGRvY3VtZW50LCBuYW1lLCB2YWx1ZSwgZGF5cyA9IDM2NSkgPT4ge1xuXHRsZXQgZXhwaXJlcyA9ICcnO1xuXHRpZiAodHlwZW9mIGRheXMgPT09ICdudW1iZXInKSB7XG5cdFx0Y29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0ZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuXHRcdGV4cGlyZXMgPSBgOyBleHBpcmVzPSR7ZGF0ZS50b1VUQ1N0cmluZygpfWA7XG5cdH1cblx0bGV0IHNlY3VyZSA9ICcnO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0LyogZ2xvYmFsIHByb2Nlc3MuZW52Lk5PREVfRU5WICovXG5cdGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG5cdFx0c2VjdXJlID0gJzsgc2VjdXJlJztcblx0fVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0ZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX0ke2V4cGlyZXN9JHtzZWN1cmV9OyBwYXRoPS9gO1xufTtcblxuY29uc3QgcmVhZENvb2tpZSA9IChkb2N1bWVudCwgbmFtZSkgPT4ge1xuXHRjb25zdCBuYW1lRVEgPSBgJHtuYW1lfT1gO1xuXHRjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0bGV0IGMgPSBjYVtpXTtcblx0XHR3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuXHRcdFx0YyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcblx0XHR9XG5cdFx0aWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGVyYXNlQ29va2llID0gKGRvY3VtZW50LCBuYW1lKSA9PiB7XG5cdGNyZWF0ZUNvb2tpZShkb2N1bWVudCwgbmFtZSwgJycsIC0xKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGVDb29raWUsXG5cdHJlYWRDb29raWUsXG5cdGVyYXNlQ29va2llXG59O1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGluaXRpYWxpc2VHb29nbGVBbmFseXRpY3MgPSAoZG9jdW1lbnQpID0+IHtcblx0Y29uc3QgZ2FJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYUlkJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FJZCcpLnRleHRDb250ZW50IDogbnVsbDtcblxuXHRmdW5jdGlvbiBndGFnKCkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZiwgcHJlZmVyLXJlc3QtcGFyYW1zXG5cdFx0ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTtcblx0fVxuXG5cdGlmIChnYUlkKSB7XG5cdFx0Y29uc3QgZ2FTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHRnYVNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdFx0Z2FTY3JpcHQuYXN5bmMgPSB0cnVlO1xuXHRcdGdhU2NyaXB0LnNyYyA9IGBodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7Z2FJZH1gO1xuXG5cdFx0Y29uc3QgZmlyc3RTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuXHRcdGZpcnN0U2NyaXB0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnYVNjcmlwdCwgZmlyc3RTY3JpcHRFbGVtZW50KTtcblxuXHRcdHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG5cdFx0Z3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcblx0XHRndGFnKCdjb25maWcnLCBnYUlkKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXRpYWxpc2VHb29nbGVBbmFseXRpY3Ncbn07XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuZnVuY3Rpb24gYXBwbHlDb25zZW50KGNvbnNlbnQpIHtcblx0d2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cblx0ZnVuY3Rpb24gZ3RhZygpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWYsIHByZWZlci1yZXN0LXBhcmFtc1xuXHRcdGRhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuXHRpZiAoY29uc2VudCA9PT0gJ2RlbmllZCcgfHwgY29uc2VudCA9PT0gJ2dyYW50ZWQnKSB7XG5cdFx0Z3RhZygnY29uc2VudCcsICd1cGRhdGUnLCB7XG5cdFx0XHRhbmFseXRpY3Nfc3RvcmFnZTogY29uc2VudCAvLyBXZSBvbmx5IGNhcmUgYWJvdXQgYW5hbHl0aWNzX3N0b3JhZ2Vcblx0XHR9KTtcblx0fVxufVxuXG5jb25zdCBkZW55Q29uc2VudCA9ICgpID0+IHtcblx0YXBwbHlDb25zZW50KCdkZW5pZWQnKTtcbn07XG5cbmNvbnN0IGdyYW50Q29uc2VudCA9ICgpID0+IHtcblx0YXBwbHlDb25zZW50KCdncmFudGVkJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z3JhbnRDb25zZW50LFxuXHRkZW55Q29uc2VudFxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cblxuY29uc3QgeyByZWFkQ29va2llIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS9jb29raWUtamFyJyk7XG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS9jb29raWUtY29uZmlnJyk7XG5jb25zdCB7IGluaXRpYWxpc2VHb29nbGVBbmFseXRpY3MgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlLWFuYWx5dGljcycpO1xuY29uc3QgZ29vZ2xlVGFnTWFuYWdlciA9IHJlcXVpcmUoJy4vZ29vZ2xlLXRhZy1tYW5hZ2VyJyk7XG5cbmNvbnN0IGluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzID0gKGRvY3VtZW50KSA9PiB7XG5cdGNvbnN0IGNvb2tpZSA9IHJlYWRDb29raWUoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5DT09LSUVfUE9MSUNZX0tFWSk7XG5cblx0aWYgKGNvb2tpZSA9PT0gbnVsbCkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0Y29uc29sZS5sb2coJ0NvbnNlbnQgbm90IHlldCBnaXZlbiBmb3Igb3B0aW9uYWwgSmF2YVNjcmlwdHMuJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cblx0XHRpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkLnVzYWdlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChwYXJzZWQudXNhZ2UgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS5sb2coJ0RlY2xpbmVkIGNvbnNlbnQuIFRoaXJkIHBhcnR5IGNvb2tpZXMgYXJlIG5vdCBlbmFibGVkLicpO1xuXG5cdFx0XHRpZiAocHJvY2Vzcy5lbnYuZ29vZ2xlVGFnTWFuYWdlciAmJiBwcm9jZXNzLmVudi5nb29nbGVUYWdNYW5hZ2VySWQpIHtcblx0XHRcdFx0Z29vZ2xlVGFnTWFuYWdlci5kZW55Q29uc2VudCgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChwcm9jZXNzLmVudi5nb29nbGVUYWdNYW5hZ2VyICYmIHByb2Nlc3MuZW52Lmdvb2dsZVRhZ01hbmFnZXJJZCkge1xuXHRcdFx0Z29vZ2xlVGFnTWFuYWdlci5ncmFudENvbnNlbnQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5pdGlhbGlzZUdvb2dsZUFuYWx5dGljcyhkb2N1bWVudCk7XG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gZGVjb2RlIHRoZSB2YWx1ZSBvZiBjb29raWUnLCBlKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCB7IGNvb2tpZUNvbnNlbnRIYW5kbGVyIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS9jb29raWUtY29uc2VudCcpO1xuY29uc3QgeyBpbml0aWFsaXNlT3B0aW9uYWxKYXZhU2NyaXB0cyB9ID0gcmVxdWlyZSgnLi9qYXZhc2NyaXB0LXJlcXVpcmluZy1jb25zZW50Jyk7XG5cbmNvb2tpZUNvbnNlbnRIYW5kbGVyKGRvY3VtZW50KTtcbmluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzKGRvY3VtZW50KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==