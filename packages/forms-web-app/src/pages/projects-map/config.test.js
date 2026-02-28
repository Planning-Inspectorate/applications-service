const { projectsMapRoute } = require('./config');

describe('pages/projects-map/config', () => {
	describe('#projectsMapRoute', () => {
		it('should return the projects map route', () => {
			expect(projectsMapRoute).toEqual('projects-map');
		});
	});
});
