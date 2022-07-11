/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/client-side/cookie-preferences/index.js":
/*!*********************************************************!*\
  !*** ./src/lib/client-side/cookie-preferences/index.js ***!
  \*********************************************************/
/***/ ((module) => {

/* eslint-env browser */

const initialiseCookiePreferencePage = (document) => {
	document
		.querySelectorAll('.cookie-settings__no-js')
		.forEach((element) => element.classList.add('govuk-!-display-none'));

	document
		.querySelectorAll('.cookie-settings__with-js')
		.forEach((element) => element.classList.remove('govuk-!-display-none'));
};

module.exports = {
	initialiseCookiePreferencePage
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
/*!********************************************************!*\
  !*** ./src/lib/client-side/cookie-preferences-page.js ***!
  \********************************************************/
/* eslint-env browser */

const { initialiseCookiePreferencePage } = __webpack_require__(/*! ./cookie-preferences/index */ "./src/lib/client-side/cookie-preferences/index.js");

initialiseCookiePreferencePage(document);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llUHJlZmVyZW5jZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQTs7QUFFQSxRQUFRLGlDQUFpQyxFQUFFLG1CQUFPLENBQUMscUZBQTRCOztBQUUvRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS1wcmVmZXJlbmNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS1wcmVmZXJlbmNlcy1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBpbml0aWFsaXNlQ29va2llUHJlZmVyZW5jZVBhZ2UgPSAoZG9jdW1lbnQpID0+IHtcblx0ZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvckFsbCgnLmNvb2tpZS1zZXR0aW5nc19fbm8tanMnKVxuXHRcdC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvdnVrLSEtZGlzcGxheS1ub25lJykpO1xuXG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb29raWUtc2V0dGluZ3NfX3dpdGgtanMnKVxuXHRcdC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dvdnVrLSEtZGlzcGxheS1ub25lJykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXRpYWxpc2VDb29raWVQcmVmZXJlbmNlUGFnZVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgeyBpbml0aWFsaXNlQ29va2llUHJlZmVyZW5jZVBhZ2UgfSA9IHJlcXVpcmUoJy4vY29va2llLXByZWZlcmVuY2VzL2luZGV4Jyk7XG5cbmluaXRpYWxpc2VDb29raWVQcmVmZXJlbmNlUGFnZShkb2N1bWVudCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=