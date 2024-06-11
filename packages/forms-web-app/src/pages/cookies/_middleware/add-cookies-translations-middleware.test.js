const { addCookiesTranslationsMiddleware } = require('./add-cookies-translations-middleware');

jest.mock('../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get English translations',
			cy: 'mock get Welsh translations'
		})
	};
});

describe('pages/cookies/_middleware/add-cookies-translations-middleware', () => {
	describe('#addCookiesTranslationsMiddleware', () => {
		const req = {
			i18n: {
				language: null,
				addResourceBundle: jest.fn()
			}
		};
		const res = {};
		const next = jest.fn();

		describe('When the language is set to English', () => {
			beforeEach(() => {
				req.i18n.language = 'en';
				addCookiesTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'cookies',
					'mock get English translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addCookiesTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'cookies',
					'mock get Welsh translations'
				);
			});
		});
	});
});
