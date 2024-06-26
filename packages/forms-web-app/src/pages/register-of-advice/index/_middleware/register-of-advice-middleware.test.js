const { addRegisterOfAdviceTranslationsMiddleware } = require('./register-of-advice-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get english translations',
			cy: 'mock get welsh translations'
		})
	};
});

describe('pages/register-of-advice/_middleware/register-of-advice-middleware', () => {
	describe('#registerOfAdviceMiddleware', () => {
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
				addRegisterOfAdviceTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'en',
					'registerOfAdvice',
					'mock get english translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addRegisterOfAdviceTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResources).toHaveBeenCalledWith(
					'cy',
					'registerOfAdvice',
					'mock get welsh translations'
				);
			});
		});
	});
});
