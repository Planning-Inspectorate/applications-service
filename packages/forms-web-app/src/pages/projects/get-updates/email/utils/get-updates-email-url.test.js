const { getUpdatesEmailURL } = require('./get-updates-email-url');

describe('pages/projects/get-updates/index/utils/get-updates-email-url', () => {
	describe('#getUpdatesEmailURL', () => {
		describe('When getting the projects updates email URL', () => {
			describe('and a case reference is not provided', () => {
				const projectUpdatesEmailURL = getUpdatesEmailURL();
				it('should return the projects get updates email URL with the route parameters', () => {
					expect(projectUpdatesEmailURL).toEqual('/projects/:case_ref/get-updates/email');
				});
			});
			describe('and a case reference is provided', () => {
				const projectUpdatesEmailURL = getUpdatesEmailURL('mock-case-reference');
				it('should return the projects get updates email URL with the case reference', () => {
					expect(projectUpdatesEmailURL).toEqual('/projects/mock-case-reference/get-updates/email');
				});
			});
		});
	});
});
