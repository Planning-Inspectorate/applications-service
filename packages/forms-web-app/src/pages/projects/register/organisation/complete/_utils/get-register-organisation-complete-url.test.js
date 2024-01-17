const { getRegisterOrganisationCompleteURL } = require('./get-register-organisation-complete-url');

describe('pages/projects/register/organisation/complete/_utils/get-register-organisation-complete-url', () => {
	describe('#getRegisterOrganisationCompleteURL', () => {
		describe('When getting the register organisation complete URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationCompleteURL = getRegisterOrganisationCompleteURL();
				it('should return the register organisation complete URL with the route parameters', () => {
					expect(registerOrganisationCompleteURL).toEqual(
						'/projects/:case_ref/register/organisation/registration-complete'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationCompleteURL =
					getRegisterOrganisationCompleteURL('mock-case-reference');
				it('should return the register organisation complete URL with the case reference', () => {
					expect(registerOrganisationCompleteURL).toEqual(
						'/projects/mock-case-reference/register/organisation/registration-complete'
					);
				});
			});
		});
	});
});
