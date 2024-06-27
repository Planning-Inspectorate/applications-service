const { getUpdatesSubscribedRoute, getUpdatesSubscribedI18nNamespace } = require('./config');

describe('pages/projects/get-updates/subscribed/config', () => {
	describe('#getUpdatesSubscribedRoute', () => {
		it('should return the get updates subscribed route', () => {
			expect(getUpdatesSubscribedRoute).toEqual('subscribed');
		});
	});

	describe('#getUpdatesSubscribedI18nNamespace', () => {
		it('should return the get updates subscribed namespace', () => {
			expect(getUpdatesSubscribedI18nNamespace).toEqual('getUpdatesSubscribed');
		});
	});
});
