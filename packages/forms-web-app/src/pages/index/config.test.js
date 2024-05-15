const { indexRoute, indexI18nNamespace } = require('./config');

describe('pages/index/config', () => {
	describe('#indexRoute', () => {
		it('should return the index route', () => {
			expect(indexRoute).toEqual('');
		});
	});

	describe('#indexI18nNamespace', () => {
		it('should return the index i18n namespace', () => {
			expect(indexI18nNamespace).toEqual('index');
		});
	});
});
