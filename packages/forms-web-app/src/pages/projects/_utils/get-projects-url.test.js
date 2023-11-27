const { getProjectsURL } = require('./get-projects-url');

describe('pages/projects/_utils/get-projects-url', () => {
	describe('#getProjectsURL', () => {
		describe('When getting the projects URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsURL = getProjectsURL();
				it('should return the projects URL with the route parameters', () => {
					expect(projectsURL).toEqual('/projects/:case_ref');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsURL = getProjectsURL('mock-case-reference');
				it('should return the projects URL with the case reference', () => {
					expect(projectsURL).toEqual('/projects/mock-case-reference');
				});
			});
		});
	});
});
