const { representationRouteParam } = require('./config');

describe('pages/projects/representations/representation/config', () => {
	describe('#representationRouteParam', () => {
		it('should return the representation route param', () => {
			expect(representationRouteParam).toEqual('id');
		});
	});
});
