const { projectsRoute, projectsRouteParam, projectsI18nNamespace } = require('./config');

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
	describe('#projectsI18nNamespace', () => {
		it('should return the projects i18n namespace', () => {
			expect(projectsI18nNamespace).toEqual('projects');
		});
	});
});
