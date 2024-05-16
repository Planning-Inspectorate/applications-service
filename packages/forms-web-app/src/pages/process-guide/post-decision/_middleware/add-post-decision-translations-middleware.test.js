const {
	addPostDecisionTranslationsMiddleware
} = require('./add-post-decision-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/process-guide/post-decision/_middleware/add-post-decision-translations-middleware', () => {
	describe('#addPostDecisionTranslationsMiddleware', () => {
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
				addPostDecisionTranslationsMiddleware(req, res, next);
			});

			it('should add the english translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'en',
					'postDecision',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addPostDecisionTranslationsMiddleware(req, res, next);
			});

			it('should add the welsh translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'cy',
					'postDecision',
					'mock get welsh translations'
				);
			});
		});
	});
});
