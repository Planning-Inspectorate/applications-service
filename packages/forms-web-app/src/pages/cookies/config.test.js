const { cookiesRoute, cookiesI18nNamespace } = require('./config');

describe('pages/cookies/config', () => {
	describe('#cookiesRoute', () => {
		it('should return the cookies route', () => {
			expect(cookiesRoute).toEqual('cookies');
		});
	});

	describe('#cookiesI18nNamespace', () => {
		it('should return the cookies namespace', () => {
			expect(cookiesI18nNamespace).toEqual('cookies');
		});
	});
});
