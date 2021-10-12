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
  initialiseCookiePreferencePage,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llUHJlZmVyZW5jZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQTs7QUFFQSxRQUFRLGlDQUFpQyxFQUFFLG1CQUFPLENBQUMscUZBQTRCOztBQUUvRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS1wcmVmZXJlbmNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9mb3Jtcy13ZWItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zvcm1zLXdlYi1hcHAvLi9zcmMvbGliL2NsaWVudC1zaWRlL2Nvb2tpZS1wcmVmZXJlbmNlcy1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBpbml0aWFsaXNlQ29va2llUHJlZmVyZW5jZVBhZ2UgPSAoZG9jdW1lbnQpID0+IHtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvckFsbCgnLmNvb2tpZS1zZXR0aW5nc19fbm8tanMnKVxuICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvdnVrLSEtZGlzcGxheS1ub25lJykpO1xuXG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb29raWUtc2V0dGluZ3NfX3dpdGgtanMnKVxuICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dvdnVrLSEtZGlzcGxheS1ub25lJykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRpYWxpc2VDb29raWVQcmVmZXJlbmNlUGFnZSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IHsgaW5pdGlhbGlzZUNvb2tpZVByZWZlcmVuY2VQYWdlIH0gPSByZXF1aXJlKCcuL2Nvb2tpZS1wcmVmZXJlbmNlcy9pbmRleCcpO1xuXG5pbml0aWFsaXNlQ29va2llUHJlZmVyZW5jZVBhZ2UoZG9jdW1lbnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9