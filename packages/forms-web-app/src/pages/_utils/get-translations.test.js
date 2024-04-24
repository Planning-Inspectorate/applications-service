const { getTranslations } = require('./get-translations');

describe('pages/_utils/get-translations', () => {
	describe('#getTranslations', () => {
		const enTranslations = 'mock english translations';
		const cyTranslations = 'mock welsh translations';

		it('should return the translations', () => {
			expect(getTranslations(enTranslations, cyTranslations)).toEqual({
				cy: 'mock welsh translations',
				en: 'mock english translations'
			});
		});
	});
});
