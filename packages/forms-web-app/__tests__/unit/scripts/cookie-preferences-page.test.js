/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const { initialiseCookiePreferencePage } = require('../../../src/scripts/cookie-preferences');

jest.mock('../../../src/scripts/cookie-preferences');

describe('scripts/cookie-preferences-page', () => {
	test('calls the expected functions', () => {
		// eslint-disable-next-line global-require
		require('../../../src/scripts/cookie-preferences-page');

		expect(initialiseCookiePreferencePage).toHaveBeenCalledWith(document);
	});
});
