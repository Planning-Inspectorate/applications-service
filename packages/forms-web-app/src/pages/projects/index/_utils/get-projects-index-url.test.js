const { getProjectsIndexURL } = require('./get-projects-index-url');

describe('pages/projects/index/_utils/get-projects-index-url', () => {
	describe('#getProjectsIndexURL', () => {
		describe('When getting the projects index URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsIndexURL = getProjectsIndexURL();
				it('should return the projects index URL with the route parameters', () => {
					expect(projectsIndexURL).toEqual('/projects/:case_ref');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsIndexURL = getProjectsIndexURL('mock-case-reference');
				it('should return the projects index URL with the case reference', () => {
					expect(projectsIndexURL).toEqual('/projects/mock-case-reference');
				});
			});
		});
	});
});
