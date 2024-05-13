const { addContactTranslationsMiddleware } = require('./add-contact-translations-middleware');

jest.mock('../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/contact/_middleware/add-contact-translations-middleware', () => {
	describe('#addContactTranslationsMiddleware', () => {
		const req = {
			i18n: {
				language: null,
				addResources: jest.fn()
			}
		};
		const res = {};
		const next = jest.fn();

		describe('When the language is set to english', () => {
			beforeEach(() => {
				req.i18n.language = 'en';
				addContactTranslationsMiddleware(req, res, next);
			});

			it('should add the english translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'en',
					'contact',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addContactTranslationsMiddleware(req, res, next);
			});

			it('should add the welsh translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'cy',
					'contact',
					'mock get welsh translations'
				);
			});
		});
	});
});
