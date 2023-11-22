const { getSection51AdviceDetailURL } = require('./get-section-51-advice-detail-url');

describe('pages/projects/section-51/advice-detail/_utils/get-section-51-advice-detail-url', () => {
	describe('#getSection51AdviceDetailURL', () => {
		describe('When getting the section 51 advice detail URL', () => {
			describe('and a case reference and a advice details id are not provided', () => {
				const section51AdviceDetailURL = getSection51AdviceDetailURL();
				it('should return the section 51 advice detail URL with the route parameters', () => {
					expect(section51AdviceDetailURL).toEqual('/projects/:case_ref/s51advice/:id');
				});
			});
			describe('and a case reference and a advice details id are provided', () => {
				const section51AdviceDetailURL = getSection51AdviceDetailURL(
					'mock-case-reference',
					'mock-advice-details-id'
				);
				it('should return the section 51 advice detail URL with the case reference and advice details id', () => {
					expect(section51AdviceDetailURL).toEqual(
						'/projects/mock-case-reference/s51advice/mock-advice-details-id'
					);
				});
			});
		});
	});
});
