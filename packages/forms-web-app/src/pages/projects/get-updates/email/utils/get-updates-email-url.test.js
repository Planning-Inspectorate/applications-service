const { getUpdatesEmailURL } = require('./get-updates-email-url');

describe('pages/projects/get-updates/index/utils/get-updates-email-url', () => {
	describe('#getUpdatesIndexURL', () => {
		describe('When getting the projects updates index URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdateEmailURL = getUpdatesEmailURL();
				it('should return the projects documents URL with the route parameters', () => {
					expect(getProjectUpdateEmailURL).toEqual('/projects/:case_ref/get-updates/email');
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdateEmailURL = getUpdatesEmailURL('mock-case-reference');
				it('should return the projects documents URL with the case reference', () => {
					expect(getProjectUpdateEmailURL).toEqual(
						'/projects/mock-case-reference/get-updates/email'
					);
				});
			});
		});
	});
});
