const { projectsRoute, projectsRouteParam } = require('./config');

describe('pages/projects/config', () => {
	describe('#projectsRoute', () => {
		it('should return the projects route', () => {
			expect(projectsRoute).toEqual('projects');
		});
	});
	describe('#projectsRouteParam', () => {
		it('should return the projects route param', () => {
			expect(projectsRouteParam).toEqual('case_ref');
		});
	});
});
