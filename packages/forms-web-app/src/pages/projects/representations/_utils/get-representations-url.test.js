const { getRepresentationsURL } = require('./get-representations-url');

describe('pages/projects/representations/_utils/get-representations-url', () => {
	describe('#getRepresentationsURL', () => {
		describe('When getting the relevant representations URL', () => {
			describe('and a case reference is not provided', () => {
				const representationsURL = getRepresentationsURL();
				it('should return the relevant-representations URL with the route parameters', () => {
					expect(representationsURL).toEqual('/projects/:case_ref/representations');
				});
			});
			describe('and a case reference is provided', () => {
				const representationsURL = getRepresentationsURL('mock-case-reference');
				it('should return the relevant-representations URL with the case reference', () => {
					expect(representationsURL).toEqual('/projects/mock-case-reference/representations');
				});
			});
		});
	});
});
