/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/client-side/cookie/cookie-config.js":
/*!*****************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-config.js ***!
  \*****************************************************/
/***/ ((module) => {

const COOKIE_POLICY_KEY = 'cookie_policy';

const CSS_CLASSES = {
  displayNone: 'govuk-!-display-none',
};

const DEFAULT_COOKIE_POLICY = {
  essential: true,
  settings: false,
  usage: false,
  campaigns: false,
};

const SELECTORS = {
  button: {
    cookieBanner: {
      consent: 'button[name="cookie_banner"]',
      accepted: 'button[name="cookie_banner_accepted"]',
      rejected: 'button[name="cookie_banner_rejected"]',
    },
  },
  cookieBanner: {
    consent: '#cookie-banner-consent',
    accepted: '#cookie-banner-accepted',
    rejected: '#cookie-banner-rejected',
  },
};

module.exports = {
  COOKIE_POLICY_KEY,
  CSS_CLASSES,
  DEFAULT_COOKIE_POLICY,
  SELECTORS,
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
  showSingleDomElementBySelector,
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
  showCookieConsentAcceptedBanner,
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
  showSingleDomElementBySelector,
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
  showCookieConsentRejectedBanner,
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
    rejectCookieConsentButton,
  };
};

const displayConsentButtons = (consentButtons) =>
  consentButtons.forEach((button) => button.classList.remove(cookieConfig.CSS_CLASSES.displayNone));

const addAcceptCookieConsentListener = (document, acceptCookieConsentButton) => {
  const handler = () => {
    setCookies(document, {
      ...cookieConfig.DEFAULT_COOKIE_POLICY,
      usage: true,
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
  setCookies,
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
  hideSingleDomElementBySelector,
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
  eraseCookie,
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
  initialiseGoogleAnalytics,
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
      analytics_storage: consent, // We only care about analytics_storage
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
  denyConsent,
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
  initialiseOptionalJavaScripts,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7O0FBRUEsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDcEQscUJBQXFCLG1CQUFPLENBQUMsNkVBQXdCO0FBQ3JELFFBQVEsNEJBQTRCLEVBQUUsbUJBQU8sQ0FBQyxxRUFBb0I7QUFDbEUseUJBQXlCLG1CQUFPLENBQUMseUVBQXNCOztBQUV2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVUsS0FBOEQsRUFBRSxFQUVuRTtBQUNQO0FBQ0E7O0FBRUEsUUFBUSxLQUE4RCxFQUFFLEVBRW5FLENBQUM7QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQy9DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7O0FBRUEsUUFBUSx1QkFBdUIsRUFBRSxtQkFBTyxDQUFDLCtFQUF5QjtBQUNsRSxRQUFRLGdDQUFnQyxFQUFFLG1CQUFPLENBQUMsNkZBQWdDOztBQUVsRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1jb25maWcuanMiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1jb25zZW50LWFjY2VwdGVkLmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS9jb29raWUtY29uc2VudC1yZWplY3RlZC5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9jb29raWUvY29va2llLWNvbnNlbnQuanMiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvY29va2llL2Nvb2tpZS1kb20taGVscGVycy5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9jb29raWUvY29va2llLWphci5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9nb29nbGUtYW5hbHl0aWNzLmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2dvb2dsZS10YWctbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwLy4vc3JjL2xpYi9jbGllbnQtc2lkZS9qYXZhc2NyaXB0LXJlcXVpcmluZy1jb25zZW50LmpzIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZm9ybXMtd2ViLWFwcC8uL3NyYy9saWIvY2xpZW50LXNpZGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ09PS0lFX1BPTElDWV9LRVkgPSAnY29va2llX3BvbGljeSc7XG5cbmNvbnN0IENTU19DTEFTU0VTID0ge1xuICBkaXNwbGF5Tm9uZTogJ2dvdnVrLSEtZGlzcGxheS1ub25lJyxcbn07XG5cbmNvbnN0IERFRkFVTFRfQ09PS0lFX1BPTElDWSA9IHtcbiAgZXNzZW50aWFsOiB0cnVlLFxuICBzZXR0aW5nczogZmFsc2UsXG4gIHVzYWdlOiBmYWxzZSxcbiAgY2FtcGFpZ25zOiBmYWxzZSxcbn07XG5cbmNvbnN0IFNFTEVDVE9SUyA9IHtcbiAgYnV0dG9uOiB7XG4gICAgY29va2llQmFubmVyOiB7XG4gICAgICBjb25zZW50OiAnYnV0dG9uW25hbWU9XCJjb29raWVfYmFubmVyXCJdJyxcbiAgICAgIGFjY2VwdGVkOiAnYnV0dG9uW25hbWU9XCJjb29raWVfYmFubmVyX2FjY2VwdGVkXCJdJyxcbiAgICAgIHJlamVjdGVkOiAnYnV0dG9uW25hbWU9XCJjb29raWVfYmFubmVyX3JlamVjdGVkXCJdJyxcbiAgICB9LFxuICB9LFxuICBjb29raWVCYW5uZXI6IHtcbiAgICBjb25zZW50OiAnI2Nvb2tpZS1iYW5uZXItY29uc2VudCcsXG4gICAgYWNjZXB0ZWQ6ICcjY29va2llLWJhbm5lci1hY2NlcHRlZCcsXG4gICAgcmVqZWN0ZWQ6ICcjY29va2llLWJhbm5lci1yZWplY3RlZCcsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ09PS0lFX1BPTElDWV9LRVksXG4gIENTU19DTEFTU0VTLFxuICBERUZBVUxUX0NPT0tJRV9QT0xJQ1ksXG4gIFNFTEVDVE9SUyxcbn07XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgY29va2llQ29uZmlnID0gcmVxdWlyZSgnLi9jb29raWUtY29uZmlnJyk7XG5jb25zdCB7XG4gIGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3RvcixcbiAgc2hvd1NpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yLFxufSA9IHJlcXVpcmUoJy4vY29va2llLWRvbS1oZWxwZXJzJyk7XG5cbmNvbnN0IGhpZGVDb25zZW50QWNjZXB0ZWRCYW5uZXIgPSAoZG9jdW1lbnQpID0+XG4gIGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3Rvcihkb2N1bWVudCwgY29va2llQ29uZmlnLlNFTEVDVE9SUy5jb29raWVCYW5uZXIuYWNjZXB0ZWQpO1xuXG5jb25zdCBhZGRDb29raWVDb25zZW50QWNjZXB0ZWRMaXN0ZW5lciA9IChkb2N1bWVudCkgPT4ge1xuICBjb25zdCBhY2tub3dsZWRnZUNvb2tpZUNvbnNlbnRBY2NlcHRlZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgY29va2llQ29uZmlnLlNFTEVDVE9SUy5idXR0b24uY29va2llQmFubmVyLmFjY2VwdGVkXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlciA9ICgpID0+IHtcbiAgICBoaWRlQ29uc2VudEFjY2VwdGVkQmFubmVyKGRvY3VtZW50KTtcbiAgICBhY2tub3dsZWRnZUNvb2tpZUNvbnNlbnRBY2NlcHRlZEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICB9O1xuXG4gIGFja25vd2xlZGdlQ29va2llQ29uc2VudEFjY2VwdGVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciwgZmFsc2UpO1xufTtcblxuY29uc3Qgc2hvd0Nvb2tpZUNvbnNlbnRBY2NlcHRlZEJhbm5lciA9IChkb2N1bWVudCkgPT4ge1xuICBzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5TRUxFQ1RPUlMuY29va2llQmFubmVyLmFjY2VwdGVkKTtcbiAgYWRkQ29va2llQ29uc2VudEFjY2VwdGVkTGlzdGVuZXIoZG9jdW1lbnQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZENvb2tpZUNvbnNlbnRBY2NlcHRlZExpc3RlbmVyLFxuICBoaWRlQ29uc2VudEFjY2VwdGVkQmFubmVyLFxuICBzaG93Q29va2llQ29uc2VudEFjY2VwdGVkQmFubmVyLFxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBjb29raWVDb25maWcgPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25maWcnKTtcbmNvbnN0IHtcbiAgaGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yLFxuICBzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IsXG59ID0gcmVxdWlyZSgnLi9jb29raWUtZG9tLWhlbHBlcnMnKTtcblxuY29uc3QgaGlkZUNvbnNlbnRSZWplY3RlZEJhbm5lciA9IChkb2N1bWVudCkgPT5cbiAgaGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yKGRvY3VtZW50LCBjb29raWVDb25maWcuU0VMRUNUT1JTLmNvb2tpZUJhbm5lci5yZWplY3RlZCk7XG5cbmNvbnN0IGFkZENvb2tpZUNvbnNlbnRSZWplY3RlZExpc3RlbmVyID0gKGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGFja25vd2xlZGdlQ29va2llQ29uc2VudFJlamVjdGVkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBjb29raWVDb25maWcuU0VMRUNUT1JTLmJ1dHRvbi5jb29raWVCYW5uZXIucmVqZWN0ZWRcbiAgKTtcblxuICBjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuICAgIGhpZGVDb25zZW50UmVqZWN0ZWRCYW5uZXIoZG9jdW1lbnQpO1xuICAgIGFja25vd2xlZGdlQ29va2llQ29uc2VudFJlamVjdGVkQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG4gIH07XG5cbiAgYWNrbm93bGVkZ2VDb29raWVDb25zZW50UmVqZWN0ZWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyLCBmYWxzZSk7XG59O1xuXG5jb25zdCBzaG93Q29va2llQ29uc2VudFJlamVjdGVkQmFubmVyID0gKGRvY3VtZW50KSA9PiB7XG4gIHNob3dTaW5nbGVEb21FbGVtZW50QnlTZWxlY3Rvcihkb2N1bWVudCwgY29va2llQ29uZmlnLlNFTEVDVE9SUy5jb29raWVCYW5uZXIucmVqZWN0ZWQpO1xuICBhZGRDb29raWVDb25zZW50UmVqZWN0ZWRMaXN0ZW5lcihkb2N1bWVudCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkQ29va2llQ29uc2VudFJlamVjdGVkTGlzdGVuZXIsXG4gIGhpZGVDb25zZW50UmVqZWN0ZWRCYW5uZXIsXG4gIHNob3dDb29raWVDb25zZW50UmVqZWN0ZWRCYW5uZXIsXG59O1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGNvb2tpZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29va2llLWNvbmZpZycpO1xuY29uc3QgeyBjcmVhdGVDb29raWUsIGVyYXNlQ29va2llLCByZWFkQ29va2llIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS1qYXInKTtcbmNvbnN0IHsgaGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS1kb20taGVscGVycycpO1xuY29uc3QgeyBzaG93Q29va2llQ29uc2VudEFjY2VwdGVkQmFubmVyIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS1jb25zZW50LWFjY2VwdGVkJyk7XG5jb25zdCB7IHNob3dDb29raWVDb25zZW50UmVqZWN0ZWRCYW5uZXIgfSA9IHJlcXVpcmUoJy4vY29va2llLWNvbnNlbnQtcmVqZWN0ZWQnKTtcbmNvbnN0IHsgaW5pdGlhbGlzZU9wdGlvbmFsSmF2YVNjcmlwdHMgfSA9IHJlcXVpcmUoJy4uL2phdmFzY3JpcHQtcmVxdWlyaW5nLWNvbnNlbnQnKTtcblxuY29uc3Qgc2V0Q29va2llcyA9IChkb2N1bWVudCwgY29va2llUG9saWN5KSA9PiB7XG4gIGVyYXNlQ29va2llKGRvY3VtZW50LCBjb29raWVDb25maWcuQ09PS0lFX1BPTElDWV9LRVkpO1xuICBjcmVhdGVDb29raWUoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5DT09LSUVfUE9MSUNZX0tFWSwgSlNPTi5zdHJpbmdpZnkoY29va2llUG9saWN5KSk7XG59O1xuXG5jb25zdCBoaWRlQ29uc2VudEJhbm5lciA9IChkb2N1bWVudCkgPT5cbiAgaGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yKGRvY3VtZW50LCBjb29raWVDb25maWcuU0VMRUNUT1JTLmNvb2tpZUJhbm5lci5jb25zZW50KTtcblxuY29uc3QgZ2V0Q29uc2VudEJ1dHRvbnMgPSAoZG9jdW1lbnQpID0+IHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBjb29raWVDb25maWcuU0VMRUNUT1JTLmJ1dHRvbi5jb29raWVCYW5uZXIuY29uc2VudDtcblxuICBjb25zdCBhbGxDb25zZW50QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICBjb25zdCBhY2NlcHRDb29raWVDb25zZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3Rvcn1bdmFsdWU9XCJhY2NlcHRcIl1gKTtcbiAgY29uc3QgcmVqZWN0Q29va2llQ29uc2VudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c2VsZWN0b3J9W3ZhbHVlPVwicmVqZWN0XCJdYCk7XG5cbiAgcmV0dXJuIHtcbiAgICBhbGxDb25zZW50QnV0dG9ucyxcbiAgICBhY2NlcHRDb29raWVDb25zZW50QnV0dG9uLFxuICAgIHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24sXG4gIH07XG59O1xuXG5jb25zdCBkaXNwbGF5Q29uc2VudEJ1dHRvbnMgPSAoY29uc2VudEJ1dHRvbnMpID0+XG4gIGNvbnNlbnRCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoY29va2llQ29uZmlnLkNTU19DTEFTU0VTLmRpc3BsYXlOb25lKSk7XG5cbmNvbnN0IGFkZEFjY2VwdENvb2tpZUNvbnNlbnRMaXN0ZW5lciA9IChkb2N1bWVudCwgYWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbikgPT4ge1xuICBjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuICAgIHNldENvb2tpZXMoZG9jdW1lbnQsIHtcbiAgICAgIC4uLmNvb2tpZUNvbmZpZy5ERUZBVUxUX0NPT0tJRV9QT0xJQ1ksXG4gICAgICB1c2FnZTogdHJ1ZSxcbiAgICB9KTtcbiAgICBoaWRlQ29uc2VudEJhbm5lcihkb2N1bWVudCk7XG4gICAgYWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgIHNob3dDb29raWVDb25zZW50QWNjZXB0ZWRCYW5uZXIoZG9jdW1lbnQpO1xuICAgIGluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzKGRvY3VtZW50KTtcbiAgfTtcblxuICBhY2NlcHRDb29raWVDb25zZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciwgZmFsc2UpO1xufTtcblxuY29uc3QgYWRkUmVqZWN0Q29va2llQ29uc2VudExpc3RlbmVyID0gKGRvY3VtZW50LCByZWplY3RDb29raWVDb25zZW50QnV0dG9uKSA9PiB7XG4gIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XG4gICAgc2V0Q29va2llcyhkb2N1bWVudCwgY29va2llQ29uZmlnLkRFRkFVTFRfQ09PS0lFX1BPTElDWSk7XG4gICAgaGlkZUNvbnNlbnRCYW5uZXIoZG9jdW1lbnQpO1xuICAgIHJlamVjdENvb2tpZUNvbnNlbnRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcbiAgICBzaG93Q29va2llQ29uc2VudFJlamVjdGVkQmFubmVyKGRvY3VtZW50KTtcbiAgfTtcblxuICByZWplY3RDb29raWVDb25zZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciwgZmFsc2UpO1xufTtcblxuY29uc3QgY29va2llQ29uc2VudEhhbmRsZXIgPSAoZG9jdW1lbnQpID0+IHtcbiAgY29uc3QgeyBhbGxDb25zZW50QnV0dG9ucywgYWNjZXB0Q29va2llQ29uc2VudEJ1dHRvbiwgcmVqZWN0Q29va2llQ29uc2VudEJ1dHRvbiB9ID1cbiAgICBnZXRDb25zZW50QnV0dG9ucyhkb2N1bWVudCk7XG5cbiAgaWYgKCFhY2NlcHRDb29raWVDb25zZW50QnV0dG9uIHx8ICFyZWplY3RDb29raWVDb25zZW50QnV0dG9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHJlYWRDb29raWUoZG9jdW1lbnQsIGNvb2tpZUNvbmZpZy5DT09LSUVfUE9MSUNZX0tFWSkgIT09IG51bGwpIHtcbiAgICBoaWRlQ29uc2VudEJhbm5lcihkb2N1bWVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWRkQWNjZXB0Q29va2llQ29uc2VudExpc3RlbmVyKGRvY3VtZW50LCBhY2NlcHRDb29raWVDb25zZW50QnV0dG9uKTtcbiAgYWRkUmVqZWN0Q29va2llQ29uc2VudExpc3RlbmVyKGRvY3VtZW50LCByZWplY3RDb29raWVDb25zZW50QnV0dG9uKTtcblxuICBkaXNwbGF5Q29uc2VudEJ1dHRvbnMoYWxsQ29uc2VudEJ1dHRvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZFJlamVjdENvb2tpZUNvbnNlbnRMaXN0ZW5lcixcbiAgYWRkQWNjZXB0Q29va2llQ29uc2VudExpc3RlbmVyLFxuICBjb29raWVDb25zZW50SGFuZGxlcixcbiAgZGlzcGxheUNvbnNlbnRCdXR0b25zLFxuICBnZXRDb25zZW50QnV0dG9ucyxcbiAgaGlkZUNvbnNlbnRCYW5uZXIsXG4gIHNldENvb2tpZXMsXG59O1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGNvb2tpZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29va2llLWNvbmZpZycpO1xuXG5jb25zdCBzaG93U2luZ2xlRG9tRWxlbWVudEJ5U2VsZWN0b3IgPSAoZG9jdW1lbnQsIHNlbGVjdG9yKSA9PlxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5jbGFzc0xpc3QucmVtb3ZlKGNvb2tpZUNvbmZpZy5DU1NfQ0xBU1NFUy5kaXNwbGF5Tm9uZSk7XG5cbmNvbnN0IGhpZGVTaW5nbGVEb21FbGVtZW50QnlTZWxlY3RvciA9IChkb2N1bWVudCwgc2VsZWN0b3IpID0+XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmNsYXNzTGlzdC5hZGQoY29va2llQ29uZmlnLkNTU19DTEFTU0VTLmRpc3BsYXlOb25lKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNob3dTaW5nbGVEb21FbGVtZW50QnlTZWxlY3RvcixcbiAgaGlkZVNpbmdsZURvbUVsZW1lbnRCeVNlbGVjdG9yLFxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9qcy9jb29raWVzLmh0bWxcblxuY29uc3QgY3JlYXRlQ29va2llID0gKGRvY3VtZW50LCBuYW1lLCB2YWx1ZSwgZGF5cyA9IDM2NSkgPT4ge1xuICBsZXQgZXhwaXJlcyA9ICcnO1xuICBpZiAodHlwZW9mIGRheXMgPT09ICdudW1iZXInKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgIGV4cGlyZXMgPSBgOyBleHBpcmVzPSR7ZGF0ZS50b1VUQ1N0cmluZygpfWA7XG4gIH1cbiAgbGV0IHNlY3VyZSA9ICcnO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgLyogZ2xvYmFsIHByb2Nlc3MuZW52Lk5PREVfRU5WICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgc2VjdXJlID0gJzsgc2VjdXJlJztcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX0ke2V4cGlyZXN9JHtzZWN1cmV9OyBwYXRoPS9gO1xufTtcblxuY29uc3QgcmVhZENvb2tpZSA9IChkb2N1bWVudCwgbmFtZSkgPT4ge1xuICBjb25zdCBuYW1lRVEgPSBgJHtuYW1lfT1gO1xuICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGV0IGMgPSBjYVtpXTtcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGVyYXNlQ29va2llID0gKGRvY3VtZW50LCBuYW1lKSA9PiB7XG4gIGNyZWF0ZUNvb2tpZShkb2N1bWVudCwgbmFtZSwgJycsIC0xKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVDb29raWUsXG4gIHJlYWRDb29raWUsXG4gIGVyYXNlQ29va2llLFxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBpbml0aWFsaXNlR29vZ2xlQW5hbHl0aWNzID0gKGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGdhSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FJZCcpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhSWQnKS50ZXh0Q29udGVudCA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZ3RhZygpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWYsIHByZWZlci1yZXN0LXBhcmFtc1xuICAgIGRhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7XG4gIH1cblxuICBpZiAoZ2FJZCkge1xuICAgIGNvbnN0IGdhU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgZ2FTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIGdhU2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBnYVNjcmlwdC5zcmMgPSBgaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD0ke2dhSWR9YDtcblxuICAgIGNvbnN0IGZpcnN0U2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBmaXJzdFNjcmlwdEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2FTY3JpcHQsIGZpcnN0U2NyaXB0RWxlbWVudCk7XG5cbiAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gICAgZ3RhZygnY29uZmlnJywgZ2FJZCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0aWFsaXNlR29vZ2xlQW5hbHl0aWNzLFxufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5mdW5jdGlvbiBhcHBseUNvbnNlbnQoY29uc2VudCkge1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICBmdW5jdGlvbiBndGFnKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZiwgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChjb25zZW50ID09PSAnZGVuaWVkJyB8fCBjb25zZW50ID09PSAnZ3JhbnRlZCcpIHtcbiAgICBndGFnKCdjb25zZW50JywgJ3VwZGF0ZScsIHtcbiAgICAgIGFuYWx5dGljc19zdG9yYWdlOiBjb25zZW50LCAvLyBXZSBvbmx5IGNhcmUgYWJvdXQgYW5hbHl0aWNzX3N0b3JhZ2VcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBkZW55Q29uc2VudCA9ICgpID0+IHtcbiAgYXBwbHlDb25zZW50KCdkZW5pZWQnKTtcbn07XG5cbmNvbnN0IGdyYW50Q29uc2VudCA9ICgpID0+IHtcbiAgYXBwbHlDb25zZW50KCdncmFudGVkJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ3JhbnRDb25zZW50LFxuICBkZW55Q29uc2VudCxcbn07XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5cbmNvbnN0IHsgcmVhZENvb2tpZSB9ID0gcmVxdWlyZSgnLi9jb29raWUvY29va2llLWphcicpO1xuY29uc3QgY29va2llQ29uZmlnID0gcmVxdWlyZSgnLi9jb29raWUvY29va2llLWNvbmZpZycpO1xuY29uc3QgeyBpbml0aWFsaXNlR29vZ2xlQW5hbHl0aWNzIH0gPSByZXF1aXJlKCcuL2dvb2dsZS1hbmFseXRpY3MnKTtcbmNvbnN0IGdvb2dsZVRhZ01hbmFnZXIgPSByZXF1aXJlKCcuL2dvb2dsZS10YWctbWFuYWdlcicpO1xuXG5jb25zdCBpbml0aWFsaXNlT3B0aW9uYWxKYXZhU2NyaXB0cyA9IChkb2N1bWVudCkgPT4ge1xuICBjb25zdCBjb29raWUgPSByZWFkQ29va2llKGRvY3VtZW50LCBjb29raWVDb25maWcuQ09PS0lFX1BPTElDWV9LRVkpO1xuXG4gIGlmIChjb29raWUgPT09IG51bGwpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKCdDb25zZW50IG5vdCB5ZXQgZ2l2ZW4gZm9yIG9wdGlvbmFsIEphdmFTY3JpcHRzLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb29raWUpO1xuXG4gICAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZC51c2FnZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGFyc2VkLnVzYWdlID09PSBmYWxzZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdEZWNsaW5lZCBjb25zZW50LiBUaGlyZCBwYXJ0eSBjb29raWVzIGFyZSBub3QgZW5hYmxlZC4nKTtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lmdvb2dsZVRhZ01hbmFnZXIgJiYgcHJvY2Vzcy5lbnYuZ29vZ2xlVGFnTWFuYWdlcklkKSB7XG4gICAgICAgIGdvb2dsZVRhZ01hbmFnZXIuZGVueUNvbnNlbnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuZ29vZ2xlVGFnTWFuYWdlciAmJiBwcm9jZXNzLmVudi5nb29nbGVUYWdNYW5hZ2VySWQpIHtcbiAgICAgIGdvb2dsZVRhZ01hbmFnZXIuZ3JhbnRDb25zZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxpc2VHb29nbGVBbmFseXRpY3MoZG9jdW1lbnQpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGRlY29kZSB0aGUgdmFsdWUgb2YgY29va2llJywgZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0aWFsaXNlT3B0aW9uYWxKYXZhU2NyaXB0cyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IHsgY29va2llQ29uc2VudEhhbmRsZXIgfSA9IHJlcXVpcmUoJy4vY29va2llL2Nvb2tpZS1jb25zZW50Jyk7XG5jb25zdCB7IGluaXRpYWxpc2VPcHRpb25hbEphdmFTY3JpcHRzIH0gPSByZXF1aXJlKCcuL2phdmFzY3JpcHQtcmVxdWlyaW5nLWNvbnNlbnQnKTtcblxuY29va2llQ29uc2VudEhhbmRsZXIoZG9jdW1lbnQpO1xuaW5pdGlhbGlzZU9wdGlvbmFsSmF2YVNjcmlwdHMoZG9jdW1lbnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9