const { getRegisterOrganisationOrgNameURL } = require('./get-register-organisation-org-name-url');

describe('pages/projects/register/organisation/organisation-name/_utils/get-register-organisation-org-name-url', () => {
	describe('#getRegisterOrganisationOrgNameURL', () => {
		describe('When getting the register organisation org name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationOrgNameURL = getRegisterOrganisationOrgNameURL();
				it('should return the register organisation org name URL with the route parameters', () => {
					expect(registerOrganisationOrgNameURL).toEqual(
						'/projects/:case_ref/register/organisation/name-of-organisation-or-charity'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationOrgNameURL =
					getRegisterOrganisationOrgNameURL('mock-case-reference');
				it('should return the register organisation org name URL with the case reference', () => {
					expect(registerOrganisationOrgNameURL).toEqual(
						'/projects/mock-case-reference/register/organisation/name-of-organisation-or-charity'
					);
				});
			});
		});
	});
});
