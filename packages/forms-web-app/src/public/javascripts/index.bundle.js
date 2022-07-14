/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/client-side/cookie/cookie-config.js":
/*!*****************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-config.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("const COOKIE_POLICY_KEY = 'cookie_policy';\n\nconst CSS_CLASSES = {\n\tdisplayNone: 'govuk-!-display-none'\n};\n\nconst DEFAULT_COOKIE_POLICY = {\n\tessential: true,\n\tsettings: false,\n\tusage: false,\n\tcampaigns: false\n};\n\nconst SELECTORS = {\n\tbutton: {\n\t\tcookieBanner: {\n\t\t\tconsent: 'button[name=\"cookie_banner\"]',\n\t\t\taccepted: 'button[name=\"cookie_banner_accepted\"]',\n\t\t\trejected: 'button[name=\"cookie_banner_rejected\"]'\n\t\t}\n\t},\n\tcookieBanner: {\n\t\tconsent: '#cookie-banner-consent',\n\t\taccepted: '#cookie-banner-accepted',\n\t\trejected: '#cookie-banner-rejected'\n\t}\n};\n\nmodule.exports = {\n\tCOOKIE_POLICY_KEY,\n\tCSS_CLASSES,\n\tDEFAULT_COOKIE_POLICY,\n\tSELECTORS\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-config.js?");

/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent-accepted.js":
/*!***************************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent-accepted.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\nconst cookieConfig = __webpack_require__(/*! ./cookie-config */ \"./src/lib/client-side/cookie/cookie-config.js\");\nconst {\n\thideSingleDomElementBySelector,\n\tshowSingleDomElementBySelector\n} = __webpack_require__(/*! ./cookie-dom-helpers */ \"./src/lib/client-side/cookie/cookie-dom-helpers.js\");\n\nconst hideConsentAcceptedBanner = (document) =>\n\thideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.accepted);\n\nconst addCookieConsentAcceptedListener = (document) => {\n\tconst acknowledgeCookieConsentAcceptedButton = document.querySelector(\n\t\tcookieConfig.SELECTORS.button.cookieBanner.accepted\n\t);\n\n\tconst handler = () => {\n\t\thideConsentAcceptedBanner(document);\n\t\tacknowledgeCookieConsentAcceptedButton.removeEventListener('click', handler);\n\t};\n\n\tacknowledgeCookieConsentAcceptedButton.addEventListener('click', handler, false);\n};\n\nconst showCookieConsentAcceptedBanner = (document) => {\n\tshowSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.accepted);\n\taddCookieConsentAcceptedListener(document);\n};\n\nmodule.exports = {\n\taddCookieConsentAcceptedListener,\n\thideConsentAcceptedBanner,\n\tshowCookieConsentAcceptedBanner\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-consent-accepted.js?");

/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent-rejected.js":
/*!***************************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent-rejected.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\nconst cookieConfig = __webpack_require__(/*! ./cookie-config */ \"./src/lib/client-side/cookie/cookie-config.js\");\nconst {\n\thideSingleDomElementBySelector,\n\tshowSingleDomElementBySelector\n} = __webpack_require__(/*! ./cookie-dom-helpers */ \"./src/lib/client-side/cookie/cookie-dom-helpers.js\");\n\nconst hideConsentRejectedBanner = (document) =>\n\thideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.rejected);\n\nconst addCookieConsentRejectedListener = (document) => {\n\tconst acknowledgeCookieConsentRejectedButton = document.querySelector(\n\t\tcookieConfig.SELECTORS.button.cookieBanner.rejected\n\t);\n\n\tconst handler = () => {\n\t\thideConsentRejectedBanner(document);\n\t\tacknowledgeCookieConsentRejectedButton.removeEventListener('click', handler);\n\t};\n\n\tacknowledgeCookieConsentRejectedButton.addEventListener('click', handler, false);\n};\n\nconst showCookieConsentRejectedBanner = (document) => {\n\tshowSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.rejected);\n\taddCookieConsentRejectedListener(document);\n};\n\nmodule.exports = {\n\taddCookieConsentRejectedListener,\n\thideConsentRejectedBanner,\n\tshowCookieConsentRejectedBanner\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-consent-rejected.js?");

/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-consent.js":
/*!******************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-consent.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\nconst cookieConfig = __webpack_require__(/*! ./cookie-config */ \"./src/lib/client-side/cookie/cookie-config.js\");\nconst { createCookie, eraseCookie, readCookie } = __webpack_require__(/*! ./cookie-jar */ \"./src/lib/client-side/cookie/cookie-jar.js\");\nconst { hideSingleDomElementBySelector } = __webpack_require__(/*! ./cookie-dom-helpers */ \"./src/lib/client-side/cookie/cookie-dom-helpers.js\");\nconst { showCookieConsentAcceptedBanner } = __webpack_require__(/*! ./cookie-consent-accepted */ \"./src/lib/client-side/cookie/cookie-consent-accepted.js\");\nconst { showCookieConsentRejectedBanner } = __webpack_require__(/*! ./cookie-consent-rejected */ \"./src/lib/client-side/cookie/cookie-consent-rejected.js\");\nconst { initialiseOptionalJavaScripts } = __webpack_require__(/*! ../javascript-requiring-consent */ \"./src/lib/client-side/javascript-requiring-consent.js\");\n\nconst setCookies = (document, cookiePolicy) => {\n\teraseCookie(document, cookieConfig.COOKIE_POLICY_KEY);\n\tcreateCookie(document, cookieConfig.COOKIE_POLICY_KEY, JSON.stringify(cookiePolicy));\n};\n\nconst hideConsentBanner = (document) =>\n\thideSingleDomElementBySelector(document, cookieConfig.SELECTORS.cookieBanner.consent);\n\nconst getConsentButtons = (document) => {\n\tconst selector = cookieConfig.SELECTORS.button.cookieBanner.consent;\n\n\tconst allConsentButtons = document.querySelectorAll(selector);\n\tconst acceptCookieConsentButton = document.querySelector(`${selector}[value=\"accept\"]`);\n\tconst rejectCookieConsentButton = document.querySelector(`${selector}[value=\"reject\"]`);\n\n\treturn {\n\t\tallConsentButtons,\n\t\tacceptCookieConsentButton,\n\t\trejectCookieConsentButton\n\t};\n};\n\nconst displayConsentButtons = (consentButtons) =>\n\tconsentButtons.forEach((button) => button.classList.remove(cookieConfig.CSS_CLASSES.displayNone));\n\nconst addAcceptCookieConsentListener = (document, acceptCookieConsentButton) => {\n\tconst handler = () => {\n\t\tsetCookies(document, {\n\t\t\t...cookieConfig.DEFAULT_COOKIE_POLICY,\n\t\t\tusage: true\n\t\t});\n\t\thideConsentBanner(document);\n\t\tacceptCookieConsentButton.removeEventListener('click', handler);\n\t\tshowCookieConsentAcceptedBanner(document);\n\t\tinitialiseOptionalJavaScripts(document);\n\t};\n\n\tacceptCookieConsentButton.addEventListener('click', handler, false);\n};\n\nconst addRejectCookieConsentListener = (document, rejectCookieConsentButton) => {\n\tconst handler = () => {\n\t\tsetCookies(document, cookieConfig.DEFAULT_COOKIE_POLICY);\n\t\thideConsentBanner(document);\n\t\trejectCookieConsentButton.removeEventListener('click', handler);\n\t\tshowCookieConsentRejectedBanner(document);\n\t};\n\n\trejectCookieConsentButton.addEventListener('click', handler, false);\n};\n\nconst cookieConsentHandler = (document) => {\n\tconst { allConsentButtons, acceptCookieConsentButton, rejectCookieConsentButton } =\n\t\tgetConsentButtons(document);\n\n\tif (!acceptCookieConsentButton || !rejectCookieConsentButton) {\n\t\treturn;\n\t}\n\n\tif (readCookie(document, cookieConfig.COOKIE_POLICY_KEY) !== null) {\n\t\thideConsentBanner(document);\n\t\treturn;\n\t}\n\n\taddAcceptCookieConsentListener(document, acceptCookieConsentButton);\n\taddRejectCookieConsentListener(document, rejectCookieConsentButton);\n\n\tdisplayConsentButtons(allConsentButtons);\n};\n\nmodule.exports = {\n\taddRejectCookieConsentListener,\n\taddAcceptCookieConsentListener,\n\tcookieConsentHandler,\n\tdisplayConsentButtons,\n\tgetConsentButtons,\n\thideConsentBanner,\n\tsetCookies\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-consent.js?");

/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-dom-helpers.js":
/*!**********************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-dom-helpers.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\nconst cookieConfig = __webpack_require__(/*! ./cookie-config */ \"./src/lib/client-side/cookie/cookie-config.js\");\n\nconst showSingleDomElementBySelector = (document, selector) =>\n\tdocument.querySelector(selector).classList.remove(cookieConfig.CSS_CLASSES.displayNone);\n\nconst hideSingleDomElementBySelector = (document, selector) =>\n\tdocument.querySelector(selector).classList.add(cookieConfig.CSS_CLASSES.displayNone);\n\nmodule.exports = {\n\tshowSingleDomElementBySelector,\n\thideSingleDomElementBySelector\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-dom-helpers.js?");

/***/ }),

/***/ "./src/lib/client-side/cookie/cookie-jar.js":
/*!**************************************************!*\
  !*** ./src/lib/client-side/cookie/cookie-jar.js ***!
  \**************************************************/
/***/ ((module) => {

eval("/* eslint-env browser */\n\n// https://www.quirksmode.org/js/cookies.html\n\nconst createCookie = (document, name, value, days = 365) => {\n\tlet expires = '';\n\tif (typeof days === 'number') {\n\t\tconst date = new Date();\n\t\tdate.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);\n\t\texpires = `; expires=${date.toUTCString()}`;\n\t}\n\tlet secure = '';\n\t// eslint-disable-next-line no-unused-vars\n\t/* global process.env.NODE_ENV */\n\tif (false) {}\n\t// eslint-disable-next-line no-param-reassign\n\tdocument.cookie = `${name}=${value}${expires}${secure}; path=/`;\n};\n\nconst readCookie = (document, name) => {\n\tconst nameEQ = `${name}=`;\n\tconst ca = document.cookie.split(';');\n\tfor (let i = 0; i < ca.length; i += 1) {\n\t\tlet c = ca[i];\n\t\twhile (c.charAt(0) === ' ') {\n\t\t\tc = c.substring(1, c.length);\n\t\t}\n\t\tif (c.indexOf(nameEQ) === 0) {\n\t\t\treturn c.substring(nameEQ.length, c.length);\n\t\t}\n\t}\n\treturn null;\n};\n\nconst eraseCookie = (document, name) => {\n\tcreateCookie(document, name, '', -1);\n};\n\nmodule.exports = {\n\tcreateCookie,\n\treadCookie,\n\teraseCookie\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/cookie/cookie-jar.js?");

/***/ }),

/***/ "./src/lib/client-side/google-analytics.js":
/*!*************************************************!*\
  !*** ./src/lib/client-side/google-analytics.js ***!
  \*************************************************/
/***/ ((module) => {

eval("/* eslint-env browser */\n\nconst initialiseGoogleAnalytics = (document) => {\n\tconst gaId = document.getElementById('gaId') ? document.getElementById('gaId').textContent : null;\n\n\tfunction gtag() {\n\t\t// eslint-disable-next-line no-undef, prefer-rest-params\n\t\tdataLayer.push(arguments);\n\t}\n\n\tif (gaId) {\n\t\tconst gaScript = document.createElement('script');\n\t\tgaScript.type = 'text/javascript';\n\t\tgaScript.async = true;\n\t\tgaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;\n\n\t\tconst firstScriptElement = document.getElementsByTagName('script')[0];\n\t\tfirstScriptElement.parentNode.insertBefore(gaScript, firstScriptElement);\n\n\t\twindow.dataLayer = window.dataLayer || [];\n\n\t\tgtag('js', new Date());\n\t\tgtag('config', gaId);\n\t}\n};\n\nmodule.exports = {\n\tinitialiseGoogleAnalytics\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/google-analytics.js?");

/***/ }),

/***/ "./src/lib/client-side/google-tag-manager.js":
/*!***************************************************!*\
  !*** ./src/lib/client-side/google-tag-manager.js ***!
  \***************************************************/
/***/ ((module) => {

eval("/* eslint-env browser */\n\nfunction applyConsent(consent) {\n\twindow.dataLayer = window.dataLayer || [];\n\n\tfunction gtag() {\n\t\t// eslint-disable-next-line no-undef, prefer-rest-params\n\t\tdataLayer.push(arguments);\n\t}\n\n\t/* istanbul ignore else */\n\tif (consent === 'denied' || consent === 'granted') {\n\t\tgtag('consent', 'update', {\n\t\t\tanalytics_storage: consent // We only care about analytics_storage\n\t\t});\n\t}\n}\n\nconst denyConsent = () => {\n\tapplyConsent('denied');\n};\n\nconst grantConsent = () => {\n\tapplyConsent('granted');\n};\n\nmodule.exports = {\n\tgrantConsent,\n\tdenyConsent\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/google-tag-manager.js?");

/***/ }),

/***/ "./src/lib/client-side/index.js":
/*!**************************************!*\
  !*** ./src/lib/client-side/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\nconst { cookieConsentHandler } = __webpack_require__(/*! ./cookie/cookie-consent */ \"./src/lib/client-side/cookie/cookie-consent.js\");\nconst { initialiseOptionalJavaScripts } = __webpack_require__(/*! ./javascript-requiring-consent */ \"./src/lib/client-side/javascript-requiring-consent.js\");\n\ncookieConsentHandler(document);\ninitialiseOptionalJavaScripts(document);\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/index.js?");

/***/ }),

/***/ "./src/lib/client-side/javascript-requiring-consent.js":
/*!*************************************************************!*\
  !*** ./src/lib/client-side/javascript-requiring-consent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-env browser */\n/* istanbul ignore file */\n\nconst { readCookie } = __webpack_require__(/*! ./cookie/cookie-jar */ \"./src/lib/client-side/cookie/cookie-jar.js\");\nconst cookieConfig = __webpack_require__(/*! ./cookie/cookie-config */ \"./src/lib/client-side/cookie/cookie-config.js\");\nconst { initialiseGoogleAnalytics } = __webpack_require__(/*! ./google-analytics */ \"./src/lib/client-side/google-analytics.js\");\nconst googleTagManager = __webpack_require__(/*! ./google-tag-manager */ \"./src/lib/client-side/google-tag-manager.js\");\n\nconst initialiseOptionalJavaScripts = (document) => {\n\tconst cookie = readCookie(document, cookieConfig.COOKIE_POLICY_KEY);\n\n\tif (cookie === null) {\n\t\t// eslint-disable-next-line no-console\n\t\tconsole.log('Consent not yet given for optional JavaScripts.');\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst parsed = JSON.parse(cookie);\n\n\t\tif (!parsed || typeof parsed.usage === 'undefined') {\n\t\t\treturn;\n\t\t}\n\n\t\tif (parsed.usage === false) {\n\t\t\t// eslint-disable-next-line no-console\n\t\t\tconsole.log('Declined consent. Third party cookies are not enabled.');\n\n\t\t\tif (false) {}\n\t\t\treturn;\n\t\t}\n\n\t\tif (false) {} else {\n\t\t\tinitialiseGoogleAnalytics(document);\n\t\t}\n\t} catch (e) {\n\t\t// eslint-disable-next-line no-console\n\t\tconsole.error('Unable to decode the value of cookie', e);\n\t}\n};\n\nmodule.exports = {\n\tinitialiseOptionalJavaScripts\n};\n\n\n//# sourceURL=webpack://forms-web-app/./src/lib/client-side/javascript-requiring-consent.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/lib/client-side/index.js");
/******/ 	
/******/ })()
;