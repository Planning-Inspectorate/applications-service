const { section51Route } = require('./config');

describe('pages/projects/section-51/config', () => {
	describe('#section51Route', () => {
		it('should return the section 51 route', () => {
			expect(section51Route).toEqual('s51advice');
		});
	});
});
