const { termsAndConditionsRoute, termsAndConditionsI18nNamespace } = require('./config');

describe('pages/terms-and-conditions/config', () => {
	describe('#termsAndConditionsRoute', () => {
		it('should return the terms and conditions route', () => {
			expect(termsAndConditionsRoute).toEqual('terms-and-conditions');
		});
	});

	describe('#termsAndConditionsI18nNamespace', () => {
		it('should return the terms and conditions i18n namespace', () => {
			expect(termsAndConditionsI18nNamespace).toEqual('termsAndConditions');
		});
	});
});
