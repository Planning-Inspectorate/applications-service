const { section51AdviceDetailRouteParam } = require('./config');

describe('pages/projects/section-51/advice-detail/config', () => {
	describe('#section51AdviceDetailRouteParam', () => {
		it('should return the section 51 advice details route param', () => {
			expect(section51AdviceDetailRouteParam).toEqual('id');
		});
	});
});
