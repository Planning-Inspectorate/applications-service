const {
	addDuringExaminationTranslationsMiddleware
} = require('./add-during-examination-translations-middleware');

jest.mock('../../../_utils/get-translations', () => {
	return {
		getTranslations: () => ({
			en: 'mock get English translations',
			cy: 'mock get Welsh translations'
		})
	};
});

describe('pages/have-your-say-guide/during-examination/_middleware/add-during-examination-translations-middleware', () => {
	describe('#addDuringExaminationTranslationsMiddleware', () => {
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
				addDuringExaminationTranslationsMiddleware(req, res, next);
			});

			it('should add the English translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'en',
					'haveYourSayGuideDuringExamination',
					'mock get English translations'
				);
			});
		});

		describe('When the language is set to Welsh', () => {
			beforeEach(() => {
				req.i18n.language = 'cy';
				addDuringExaminationTranslationsMiddleware(req, res, next);
			});

			it('should add the Welsh translations', () => {
				expect(req.i18n.addResourceBundle).toHaveBeenCalledWith(
					'cy',
					'haveYourSayGuideDuringExamination',
					'mock get Welsh translations'
				);
			});
		});
	});
});
