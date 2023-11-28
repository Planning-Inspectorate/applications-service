const { getRegisterOrganisationAddressURL } = require('./get-register-organisation-address-url');

describe('pages/projects/register/organisation/address/_utils/get-register-organisation-address-url', () => {
	describe('#getRegisterOrganisationAddressURL', () => {
		describe('When getting the register organisation address URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();
				it('should return the register organisation address URL with the route parameters', () => {
					expect(registerOrganisationAddressURL).toEqual(
						'/projects/:case_ref/register/organisation/address'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationAddressURL =
					getRegisterOrganisationAddressURL('mock-case-reference');
				it('should return the register organisation address URL with the case reference', () => {
					expect(registerOrganisationAddressURL).toEqual(
						'/projects/mock-case-reference/register/organisation/address'
					);
				});
			});
		});
	});
});
