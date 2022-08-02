/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const { initialiseCookieConsent } = require('../../../../src/scripts/cookie/index');

const { cookieConsentHandler } = require('../../../../src/scripts/cookie/cookie-consent');

const { readCookie } = require('../../../../src/scripts/cookie/cookie-jar');

jest.mock('../../../../src/scripts/cookie/cookie-jar');
jest.mock('../../../../src/scripts/cookie/cookie-consent');

const getExampleDom = () => document.createElement('div');

describe('scripts/cookie/index', () => {
	let document;

	beforeEach(() => {
		document = getExampleDom();
	});

	describe('initialiseCookieConsent', () => {
		test('when cookie is null', () => {
			readCookie.mockImplementation(() => null);

			initialiseCookieConsent(document);

			expect(cookieConsentHandler).toHaveBeenCalledWith(document);
		});

		test('when cookie is not null', () => {
			readCookie.mockImplementation(() => 'a value');

			initialiseCookieConsent(document);

			expect(cookieConsentHandler).not.toHaveBeenCalled();
		});
	});
});
