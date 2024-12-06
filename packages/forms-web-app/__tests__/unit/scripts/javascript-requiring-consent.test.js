const {
	initialiseOptionalJavaScripts
} = require('../../../src/scripts/javascript-requiring-consent');

const { readCookie } = require('../../../src/scripts/cookie/cookie-jar');
const { initialiseGoogleAnalytics } = require('../../../src/scripts/google-analytics');

jest.mock('../../../src/scripts/cookie/cookie-jar');
jest.mock('../../../src/scripts/google-analytics');

describe('scripts/javascript-requiring-consent', () => {
	describe('initialiseOptionalJavaScripts', () => {
		test('return early if cookie is null', () => {
			jest.spyOn(console, 'log').mockImplementation();

			readCookie.mockImplementation(() => null);

			initialiseOptionalJavaScripts();

			expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
			// eslint-disable-next-line no-console
			expect(console.log).toHaveBeenCalledWith('Consent not yet given for optional JavaScripts.');
		});

		test('return early if `usage` is not defined', () => {
			jest.spyOn(console, 'log').mockImplementation();

			readCookie.mockImplementation(() => JSON.stringify({ a: 'b' }));

			initialiseOptionalJavaScripts();
			expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
		});

		test('return early if `usage=false`', () => {
			jest.spyOn(console, 'log').mockImplementation();

			readCookie.mockImplementation(() => JSON.stringify({ usage: false }));

			initialiseOptionalJavaScripts();

			expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
			// eslint-disable-next-line no-console
			expect(console.log).toHaveBeenCalledWith(
				'Declined consent. Third party cookies are not enabled.'
			);
		});

		test('calls through if `usage=true`', () => {
			readCookie.mockImplementation(() => JSON.stringify({ usage: true }));

			initialiseOptionalJavaScripts();
			expect(initialiseGoogleAnalytics).toHaveBeenCalled();
		});
	});
});
