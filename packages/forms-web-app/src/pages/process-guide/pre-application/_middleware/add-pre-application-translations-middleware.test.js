const {
	addPreApplicationTranslationsMiddleware
} = require('./add-pre-application-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/process-guide/pre-application/_middleware/add-pre-application-translations-middleware', () => {
	describe('#addPreApplicationTranslationsMiddleware', () => {
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
				addPreApplicationTranslationsMiddleware(req, res, next);
			});

			it('should add the english translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'en',
					'preApplication',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addPreApplicationTranslationsMiddleware(req, res, next);
			});

			it('should add the welsh translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'cy',
					'preApplication',
					'mock get welsh translations'
				);
			});
		});
	});
});
