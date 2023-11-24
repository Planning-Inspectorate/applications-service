const { getUpdatesURL } = require('./get-updates-url');

describe('pages/projects/get-updates/_utils/get-updates-url', () => {
	describe('#getUpdatesURL', () => {
		describe('When getting the projects updates URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesIndexURL = getUpdatesURL();
				it('should return the projects get updates URL with the route parameters', () => {
					expect(getProjectUpdatesIndexURL).toEqual('/projects/:case_ref/get-updates');
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesIndexURL = getUpdatesURL('mock-case-reference');
				it('should return the projects get updates URL with the case reference', () => {
					expect(getProjectUpdatesIndexURL).toEqual('/projects/mock-case-reference/get-updates');
				});
			});
		});
	});
});
