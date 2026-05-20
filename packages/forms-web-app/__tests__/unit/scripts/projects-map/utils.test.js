/**
 * @jest-environment jsdom
 *
 * @fileoverview Unit tests for {@link module:scripts/projects-map/utils}.
 */
'use strict';

const { cssVar } = require('../../../../src/scripts/projects-map/utils');

describe('cssVar', () => {
	beforeEach(() => {
		// Clean up document.documentElement style before each test
		document.documentElement.style = '';
	});

	it('returns the CSS variable value if it is set', () => {
		document.documentElement.style.setProperty('--cluster-bg', '#ff0000');
		expect(cssVar('--cluster-bg', '#000000')).toBe('#ff0000');
	});

	it('returns the fallback value if the CSS variable is not set', () => {
		expect(cssVar('--cluster-bg', '#000000')).toBe('#000000');
	});

	it('trims whitespace from the returned CSS variable value', () => {
		document.documentElement.style.setProperty('--cluster-bg', '  #00ff00  ');
		expect(cssVar('--cluster-bg', '#000000')).toBe('#00ff00');
	});
});
