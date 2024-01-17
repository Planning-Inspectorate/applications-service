const { getRegisterOrganisationEmailURL } = require('./get-register-organisation-email-url');

describe('pages/projects/register/organisation/email/_utils/get-register-organisation-email-url', () => {
	describe('#getRegisterOrganisationEmailURL', () => {
		describe('When getting the register organisation email URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationEmailURL = getRegisterOrganisationEmailURL();
				it('should return the register organisation email URL with the route parameters', () => {
					expect(registerOrganisationEmailURL).toEqual(
						'/projects/:case_ref/register/organisation/email-address'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationEmailURL = getRegisterOrganisationEmailURL('mock-case-reference');
				it('should return the register organisation email URL with the case reference', () => {
					expect(registerOrganisationEmailURL).toEqual(
						'/projects/mock-case-reference/register/organisation/email-address'
					);
				});
			});
		});
	});
});
