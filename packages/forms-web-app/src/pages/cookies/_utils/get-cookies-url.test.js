const { getCookiesURL } = require('./get-cookies-url');

describe('pages/cookies/_utils/get-cookies-url.js', () => {
	describe('#getCookiesURL', () => {
		const cookiesURL = getCookiesURL();
		it('should return the contact URL', () => {
			expect(cookiesURL).toEqual('/cookies');
		});
	});
});
