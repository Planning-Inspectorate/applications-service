const { projectsMapRoute, projectsMapI18nNamespace } = require('./config');

describe('pages/projects-map/config', () => {
	describe('exports', () => {
		it('exports projectsMapRoute string', () => {
			expect(typeof projectsMapRoute).toBe('string');
			expect(projectsMapRoute).toBe('projects-map');
		});

		it('exports projectsMapI18nNamespace string', () => {
			expect(typeof projectsMapI18nNamespace).toBe('string');
			expect(projectsMapI18nNamespace).toBe('projectsMap');
		});

		it('both exports are non-empty strings', () => {
			expect(projectsMapRoute.length).toBeGreaterThan(0);
			expect(projectsMapI18nNamespace.length).toBeGreaterThan(0);
		});

		it('route is kebab-case convention', () => {
			expect(projectsMapRoute).toMatch(/^[a-z-]+$/);
		});

		it('i18n namespace is camelCase convention', () => {
			expect(projectsMapI18nNamespace).toMatch(/^[a-zA-Z]*$/);
			expect(projectsMapI18nNamespace[0]).toBe(projectsMapI18nNamespace[0].toLowerCase());
		});
	});
});
