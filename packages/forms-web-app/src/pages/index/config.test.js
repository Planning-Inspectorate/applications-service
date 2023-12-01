const { indexRoute } = require('./config');

describe('pages/index/config', () => {
	describe('#indexRoute', () => {
		it('should return the index route', () => {
			expect(indexRoute).toEqual('');
		});
	});
});
