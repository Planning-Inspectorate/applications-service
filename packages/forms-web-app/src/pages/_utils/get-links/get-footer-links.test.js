const { getFooterLinks } = require('./get-footer-links');

describe('pages/_utils/get-links/get-footer-links', () => {
	describe('#getFooterLinks', () => {
		it('should return the footer links', () => {
			expect(getFooterLinks).toEqual({ contactURL: '/contact' });
		});
	});
});
