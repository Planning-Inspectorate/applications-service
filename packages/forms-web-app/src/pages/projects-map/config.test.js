const { projectsMapRoute, projectsMapI18nNamespace } = require('./config');

describe('pages/projects-map/config', () => {
	it('should export correct route and namespace', () => {
		expect(projectsMapRoute).toBe('projects-map');
		expect(projectsMapI18nNamespace).toBe('projectsMap');
	});
});
