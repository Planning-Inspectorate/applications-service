const {
	addProjectSearchTranslationsMiddleware
} = require('./add-project-search-translations-middleware');

jest.mock('../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get English translations',
			cy: 'mock get Welsh translations'
		})
	};
});

describe('pages/project-search/_middleware/add-project-search-translations-middleware', () => {
	describe('#addProjectSearchTranslationsMiddleware', () => {
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
				addProjectSearchTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'projectSearch',
					'mock get English translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addProjectSearchTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'projectSearch',
					'mock get Welsh translations'
				);
			});
		});
	});
});
