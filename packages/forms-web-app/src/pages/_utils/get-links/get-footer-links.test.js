const { getFooterLinks } = require('./get-footer-links');

describe('pages/_utils/get-links/get-footer-links', () => {
	describe('#getFooterLinks', () => {
		it('should return the footer links', () => {
			expect(getFooterLinks).toEqual({
				accessibilityStatementURL: '/accessibility-statement',
				contactURL: '/contact',
				cookiesURL: '/cookies',
				termsAndConditionsURL: '/terms-and-conditions'
			});
		});
	});
});
