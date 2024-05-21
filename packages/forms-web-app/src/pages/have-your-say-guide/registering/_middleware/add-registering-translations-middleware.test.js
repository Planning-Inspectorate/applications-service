const {
	addRegisteringTranslationsMiddleware
} = require('./add-registering-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/have-your-say-guide/registering/_middleware/add-registering-translations-middleware', () => {
	describe('#addRegisteringTranslationsMiddleware', () => {
		const req = {
			i18n: {
				language: null,
				addResourceBundle: jest.fn()
			}
		};
		const res = {};
		const next = jest.fn();

		describe('When the language is set to english', () => {
			beforeEach(() => {
				req.i18n.language = 'en';
				addRegisteringTranslationsMiddleware(req, res, next);
			});

			it('should add the english translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'haveYourSayGuideRegistering',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addRegisteringTranslationsMiddleware(req, res, next);
			});

			it('should add the welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'haveYourSayGuideRegistering',
					'mock get welsh translations'
				);
			});
		});
	});
});
