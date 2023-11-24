const { getProjectsDocumentsURL } = require('./get-projects-documents-url');

describe('pages/projects/documents/_utils/get-projects-documents-url', () => {
	describe('#getProjectsDocumentsURL', () => {
		describe('When getting the projects documents URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsDocumentsURL = getProjectsDocumentsURL();
				it('should return the projects documents URL with the route parameters', () => {
					expect(projectsDocumentsURL).toEqual('/projects/:case_ref/documents');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsDocumentsURL = getProjectsDocumentsURL('mock-case-reference');
				it('should return the projects documents URL with the case reference', () => {
					expect(projectsDocumentsURL).toEqual('/projects/mock-case-reference/documents');
				});
			});
		});
	});
});
