const { originRoute } = require('./config');

describe('pages/config', () => {
	describe('#originRoute', () => {
		it('should return the origin route', () => {
			expect(originRoute).toEqual('');
		});
	});
});
