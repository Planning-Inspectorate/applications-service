const { getRepresentationsIndexURL } = require('./get-representations-index-url');

describe('pages/projects/representations/index/_utils/get-representations-index-url', () => {
	describe('#getRepresentationsIndexURL', () => {
		describe('When getting the representations index URL', () => {
			describe('and a case reference is not provided', () => {
				const representationsIndexURL = getRepresentationsIndexURL();
				it('should return the representations index URL with the route parameters', () => {
					expect(representationsIndexURL).toEqual('/projects/:case_ref/representations');
				});
			});
			describe('and a case reference is provided', () => {
				const representationsIndexURL = getRepresentationsIndexURL('mock-case-reference');
				it('should return the representations index URL with the case reference', () => {
					expect(representationsIndexURL).toEqual('/projects/mock-case-reference/representations');
				});
			});
		});
	});
});
