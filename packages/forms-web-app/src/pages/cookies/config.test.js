const { cookiesRoute } = require('./config');

describe('pages/cookies/config', () => {
	describe('#cookiesRoute', () => {
		it('should return the cookies route', () => {
			expect(cookiesRoute).toEqual('cookies');
		});
	});
});
