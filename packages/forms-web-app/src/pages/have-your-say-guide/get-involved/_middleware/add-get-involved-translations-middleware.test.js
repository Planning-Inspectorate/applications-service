const {
	addGetInvolvedTranslationsMiddleware
} = require('./add-get-involved-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get English translations',
			cy: 'mock get Welsh translations'
		})
	};
});

describe('pages/have-your-say-guide/get-involved/_middleware/add-get-involved-translations-middleware', () => {
	describe('#addGetInvolvedTranslationsMiddleware', () => {
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
				addGetInvolvedTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'getInvolved',
					'mock get English translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addGetInvolvedTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'getInvolved',
					'mock get Welsh translations'
				);
			});
		});
	});
});
