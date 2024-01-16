const {
	getRegisterOrganisationAreYouOver18URL
} = require('./get-register-organisation-are-you-18-url');

describe('packages/forms-web-app/src/pages/projects/register/organisation/are-you-18/get-register-organisation-are-you-18-url', () => {
	describe('#getRegisterOrganisationAreYouOver18URL', () => {
		describe('When getting the register organisation are you 18 URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationAreYouOver18URL = getRegisterOrganisationAreYouOver18URL();
				it('should return the register organisation are you 18 URL with the route parameters', () => {
					expect(registerOrganisationAreYouOver18URL).toEqual(
						'/projects/:case_ref/register/organisation/are-you-18-over'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationAreYouOver18URL =
					getRegisterOrganisationAreYouOver18URL('mock-case-reference');
				it('should return the register organisation are you 18 URL with the case reference', () => {
					expect(registerOrganisationAreYouOver18URL).toEqual(
						'/projects/mock-case-reference/register/organisation/are-you-18-over'
					);
				});
			});
		});
	});
});
