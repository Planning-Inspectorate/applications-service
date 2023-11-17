const { getProjectUpdatesURL } = require('./get-updates-url');

describe('pages/projects/get-updates/index/utils/get-updates-index-url', () => {
	describe('#getProjectUpdatesURL', () => {
		describe('When getting the projects updates index URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesIndexURL = getProjectUpdatesURL();
				it('should return the projects documents URL with the route parameters', () => {
					expect(getProjectUpdatesIndexURL).toEqual('/projects/:case_ref/get-updates');
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesIndexURL = getProjectUpdatesURL('mock-case-reference');
				it('should return the projects documents URL with the case reference', () => {
					expect(getProjectUpdatesIndexURL).toEqual('/projects/mock-case-reference/get-updates');
				});
			});
		});
	});
});
