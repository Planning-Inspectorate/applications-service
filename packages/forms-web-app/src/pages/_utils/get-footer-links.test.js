const { getFooterLinks } = require('./get-footer-links');

describe('pages/_utils/get-footer-links', () => {
	describe('#getFooterLinks', () => {
		it('should return the footer links', () => {
			expect(getFooterLinks).toEqual({ contactURL: '/contact' });
		});
	});
});
