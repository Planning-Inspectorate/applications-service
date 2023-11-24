const { projectsAllUpdatesRoute } = require('./config');

describe('pages/projects/all-updates/config', () => {
	describe('#projectsAllUpdatesRoute', () => {
		it('should return the projects all updates route', () => {
			expect(projectsAllUpdatesRoute).toEqual('project-updates');
		});
	});
});
