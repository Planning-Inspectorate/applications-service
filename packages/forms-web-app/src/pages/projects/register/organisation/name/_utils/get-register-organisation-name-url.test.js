const { getRegisterOrganisationNameURL } = require('./get-register-organisation-name-url');

describe('pages/projects/register/organisation/name/_utils/get-register-organisation-name-url', () => {
	describe('#getRegisterOrganisationNameURL', () => {
		describe('When getting the register organisation name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationNameURL = getRegisterOrganisationNameURL();
				it('should return the register organisation name URL with the route parameters', () => {
					expect(registerOrganisationNameURL).toEqual(
						'/projects/:case_ref/register/organisation/full-name'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationNameURL = getRegisterOrganisationNameURL('mock-case-reference');
				it('should return the register organisation name URL with the case reference', () => {
					expect(registerOrganisationNameURL).toEqual(
						'/projects/mock-case-reference/register/organisation/full-name'
					);
				});
			});
		});
	});
});
