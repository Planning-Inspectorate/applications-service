const { getUpdatesIndexURL } = require('./get-updates-index-url');

describe('pages/projects/get-updates/index/utils/get-updates-index-url', () => {
	describe('#getUpdatesIndexURL', () => {
		describe('When getting the projects updates index URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesIndexURL = getUpdatesIndexURL();
				it('should return the projects get updates index URL with the route parameters', () => {
					expect(getProjectUpdatesIndexURL).toEqual('/projects/:case_ref/get-updates/start');
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesIndexURL = getUpdatesIndexURL('mock-case-reference');
				it('should return the projects get updates index URL with the case reference', () => {
					expect(getProjectUpdatesIndexURL).toEqual(
						'/projects/mock-case-reference/get-updates/start'
					);
				});
			});
		});
	});
});
