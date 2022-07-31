/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const { cookieConsentHandler } = require('../../../src/scripts/cookie/cookie-consent');

const {
	initialiseOptionalJavaScripts
} = require('../../../src/scripts/javascript-requiring-consent');

jest.mock('../../../src/scripts/cookie/cookie-consent');
jest.mock('../../../src/scripts/javascript-requiring-consent');

describe('scripts/index', () => {
	test('calls the expected functions', () => {
		// eslint-disable-next-line global-require
		require('../../../src/scripts/index');

		expect(cookieConsentHandler).toHaveBeenCalledWith(document);
		expect(initialiseOptionalJavaScripts).toHaveBeenCalledWith(document);
	});
});
