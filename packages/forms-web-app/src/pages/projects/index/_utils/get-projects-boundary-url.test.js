const { getProjectsBoundaryURL } = require('./get-projects-boundary-url');

describe('pages/projects/index/_utils/get-projects-boundary-url', () => {
	describe('#projectsBoundaryURL', () => {
		describe('When getting the projects boundary URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsBoundaryDownloadURL = getProjectsBoundaryURL();
				it('should return the projects index URL with the route parameters', () => {
					expect(projectsBoundaryDownloadURL).toEqual('/projects/:case_ref/boundary-geojson');
				});
			});
			describe('and a case reference is provided', () => {
				const projectsBoundaryDownloadURL = getProjectsBoundaryURL('mock-case-reference');
				it('should return the projects boundary URL with the case reference', () => {
					expect(projectsBoundaryDownloadURL).toEqual(
						'/projects/mock-case-reference/boundary-geojson'
					);
				});
			});
		});
	});
});
