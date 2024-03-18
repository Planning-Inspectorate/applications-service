const { getTermsAndConditionsURL } = require('./get-terms-and-conditions-url');

describe('pages/terms-and-conditions/_utils/get-terms-and-conditions-url', () => {
	describe('#getCookiesURL', () => {
		const termsAndConditionsURL = getTermsAndConditionsURL();
		it('should return the contact URL', () => {
			expect(termsAndConditionsURL).toEqual('/terms-and-conditions');
		});
	});
});
