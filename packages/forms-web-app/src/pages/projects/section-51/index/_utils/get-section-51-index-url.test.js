const { getSection51IndexURL } = require('./get-section-51-index-url');

describe('pages/projects/section-51/index/_utils/get-section-51-index-url', () => {
	describe('#getSection51IndexURL', () => {
		describe('When getting the section 51 index URL', () => {
			describe('and a case reference is not provided', () => {
				const section51IndexURL = getSection51IndexURL();
				it('should return the section 51 index URL with the route parameters', () => {
					expect(section51IndexURL).toEqual('/projects/:case_ref/s51advice');
				});
			});
			describe('and a case reference is provided', () => {
				const section51IndexURL = getSection51IndexURL('mock-case-reference');
				it('should return the section 51 index URL with the case reference', () => {
					expect(section51IndexURL).toEqual('/projects/mock-case-reference/s51advice');
				});
			});
		});
	});
});
