const { getUpdatesConfirmYourEmailURL } = require('./get-updates-confirm-your-email-url');

describe('pages/projects/get-updates/confirm-your-email/utils/get-updates-confirm-your-email-url', () => {
	describe('#getUpdatesConfirmYourEmailURL', () => {
		describe('When getting the projects updates confirm your email URL', () => {
			describe('and a case reference is not provided', () => {
				const projectUpdatesConfirmYourEmailURL = getUpdatesConfirmYourEmailURL();
				it('should return the projects get updates confirm your email URL with the route parameters', () => {
					expect(projectUpdatesConfirmYourEmailURL).toEqual(
						'/projects/:case_ref/get-updates/confirm-your-email'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const projectUpdatesConfirmYourEmailURL =
					getUpdatesConfirmYourEmailURL('mock-case-reference');
				it('should return the projects get updates confirm your email URL with the case reference', () => {
					expect(projectUpdatesConfirmYourEmailURL).toEqual(
						'/projects/mock-case-reference/get-updates/confirm-your-email'
					);
				});
			});
		});
	});
});
