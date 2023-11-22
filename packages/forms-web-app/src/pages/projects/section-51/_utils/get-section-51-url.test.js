const { getSection51URL } = require('./get-section-51-url');

describe('pages/projects/section-51/_utils/get-section-51-url', () => {
	describe('#getSection51URL', () => {
		describe('When getting the section 51 URL', () => {
			describe('and a case reference is not provided', () => {
				const section51URL = getSection51URL();
				it('should return the section 51 URL with the route parameters', () => {
					expect(section51URL).toEqual('/projects/:case_ref/s51advice');
				});
			});
			describe('and a case reference is provided', () => {
				const section51URL = getSection51URL('mock-case-reference');
				it('should return the section 51 URL with the case reference', () => {
					expect(section51URL).toEqual('/projects/mock-case-reference/s51advice');
				});
			});
		});
	});
});
