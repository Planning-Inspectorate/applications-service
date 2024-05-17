const {
	addTakingPartTranslationsMiddleware
} = require('./add-taking-part-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/have-your-say-guide/taking-part/_middleware/add-taking-part-translations-middleware', () => {
	describe('#addTakingPartTranslationsMiddleware', () => {
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
				addTakingPartTranslationsMiddleware(req, res, next);
			});

			it('should add the english translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'haveYourSayGuideTakingPart',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addTakingPartTranslationsMiddleware(req, res, next);
			});

			it('should add the welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'haveYourSayGuideTakingPart',
					'mock get welsh translations'
				);
			});
		});
	});
});
