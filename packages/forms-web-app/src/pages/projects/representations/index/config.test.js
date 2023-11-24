const { representationsIndexRoute } = require('./config');

describe('pages/projects/representations/index/config', () => {
	describe('#representationsIndexRoute', () => {
		it('should return the representations index route', () => {
			expect(representationsIndexRoute).toEqual('');
		});
	});
});
