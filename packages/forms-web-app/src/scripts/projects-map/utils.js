'use strict';

/**
 * Reads a CSS custom property from the document root.
 *
 * @param {string} name CSS variable name (e.g. `'--cluster-bg'`)
 * @param {string} fallback Value to use when the property is not set
 * @returns {string}
 */
const cssVar = (name, fallback) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

module.exports = { cssVar };
