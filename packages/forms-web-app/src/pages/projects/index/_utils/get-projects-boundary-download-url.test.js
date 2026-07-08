const { getProjectsBoundaryDownloadURL } = require('./get-projects-boundary-download-url');

describe('pages/projects/index/_utils/get-projects-boundary-download-url', () => {
	describe('#projectsBoundaryDownloadURL', () => {
		describe('When getting the projects boundary download URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsBoundaryDownloadURL = getProjectsBoundaryDownloadURL();
				it('should return the projects index URL with the route parameters', () => {
					expect(projectsBoundaryDownloadURL).toEqual('/projects/:case_ref/download-boundary');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsBoundaryDownloadURL = getProjectsBoundaryDownloadURL('mock-case-reference');
				it('should return the projects boundary download URL with the case reference', () => {
					expect(projectsBoundaryDownloadURL).toEqual(
						'/projects/mock-case-reference/download-boundary'
					);
				});
			});
		});
	});
});
