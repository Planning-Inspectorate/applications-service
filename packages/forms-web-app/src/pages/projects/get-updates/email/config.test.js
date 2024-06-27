const { getUpdatesEmailRoute, getUpdatesEmailI18nNamespace } = require('./config');

describe('pages/projects/get-updates/email/config', () => {
	describe('#getUpdatesEmailRoute', () => {
		it('should return the get updates email route', () => {
			expect(getUpdatesEmailRoute).toEqual('email');
		});
	});

	describe('#getUpdatesEmailI18nNamespace', () => {
		it('should return the get updates email namespace', () => {
			expect(getUpdatesEmailI18nNamespace).toEqual('getUpdatesEmail');
		});
	});
});
