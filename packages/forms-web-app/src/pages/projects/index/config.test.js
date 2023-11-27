const { projectsIndexRoute } = require('./config');

describe('pages/projects/index/config', () => {
	describe('#projectsIndexRoute', () => {
		it('should return the projects index route', () => {
			expect(projectsIndexRoute).toEqual('');
		});
	});
});
