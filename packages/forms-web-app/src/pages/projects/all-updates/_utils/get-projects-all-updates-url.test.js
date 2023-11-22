const { getProjectsAllUpdatesURL } = require('./get-projects-all-updates-url');

describe('pages/projects/all-updates/_utils/get-projects-all-updates-url', () => {
	describe('#getProjectsAllUpdatesURL', () => {
		describe('When getting the projects all updates URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsAllUpdatesURL = getProjectsAllUpdatesURL();
				it('should return the projects all updates URL with the route parameters', () => {
					expect(projectsAllUpdatesURL).toEqual('/projects/:case_ref/project-updates');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsAllUpdatesURL = getProjectsAllUpdatesURL('mock-case-reference');
				it('should return the projects all updates URL with the case reference', () => {
					expect(projectsAllUpdatesURL).toEqual('/projects/mock-case-reference/project-updates');
				});
			});
		});
	});
});
