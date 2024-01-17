const { getRegisterOrganisationNumberURL } = require('./get-register-organisation-number-url');

describe('pages/projects/register/organisation/number/_utils/get-register-organisation-number-url', () => {
	describe('#getRegisterOrganisationNumberURL', () => {
		describe('When getting the register organisation number URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationNumberURL = getRegisterOrganisationNumberURL();
				it('should return the register organisation number URL with the route parameters', () => {
					expect(registerOrganisationNumberURL).toEqual(
						'/projects/:case_ref/register/organisation/telephone-number'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationNumberURL =
					getRegisterOrganisationNumberURL('mock-case-reference');
				it('should return the register organisation number URL with the case reference', () => {
					expect(registerOrganisationNumberURL).toEqual(
						'/projects/mock-case-reference/register/organisation/telephone-number'
					);
				});
			});
		});
	});
});
