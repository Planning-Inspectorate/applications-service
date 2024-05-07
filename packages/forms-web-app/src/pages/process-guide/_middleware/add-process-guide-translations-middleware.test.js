const {
	addProcessGuideTranslationsMiddleware
} = require('./add-process-guide-translations-middleware');

jest.mock('../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get English translations',
			cy: 'mock get Welsh translations'
		})
	};
});

describe('pages/process-guide/_middleware/add-process-guide-translations-middleware', () => {
	describe('#addprocessGuideTranslationsMiddleware', () => {
		const req = {
			i18n: {
				language: null,
				addResources: jest.fn()
			}
		};
		const res = {};
		const next = jest.fn();

		describe('When the language is set to English', () => {
			beforeEach(() => {
				req.i18n.language = 'en';
				addProcessGuideTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'en',
					'processGuide',
					'mock get English translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addProcessGuideTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'cy',
					'processGuide',
					'mock get Welsh translations'
				);
			});
		});
	});
});
