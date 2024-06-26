const { getUpdatesIndexRoute, getUpdatesIndexI18nNamespace } = require('./config');

describe('pages/projects/get-updates/index/config', () => {
	describe('#getUpdatesIndexRoute', () => {
		it('should return the get updates index route', () => {
			expect(getUpdatesIndexRoute).toEqual('start');
		});
	});

	describe('#getUpdatesIndexI18nNamespace', () => {
		it('should return the get updates index namespace', () => {
			expect(getUpdatesIndexI18nNamespace).toEqual('getUpdatesIndex');
		});
	});
});
