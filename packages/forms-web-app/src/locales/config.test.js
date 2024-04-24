const { locales, defaultLocale, localesQueryCookieID, localesQueryStringID } = require('./config');

describe('locales/config', () => {
	describe('#locales', () => {
		it('should return the locales', () => {
			expect(locales).toEqual({
				cy: { code: 'cy', name: 'Cymraeg' },
				en: { code: 'en', name: 'English' }
			});
		});
	});

	describe('#defaultLocale', () => {
		it('should return the default locale', () => {
			expect(defaultLocale).toEqual({ code: 'en', name: 'English' });
		});
	});

	describe('#localesQueryCookieID', () => {
		it('should return the locales query string ID', () => {
			expect(localesQueryCookieID).toEqual('lang');
		});
	});

	describe('#localesQueryStringID', () => {
		it('should return the locales query string ID', () => {
			expect(localesQueryStringID).toEqual('lang');
		});
	});
});
