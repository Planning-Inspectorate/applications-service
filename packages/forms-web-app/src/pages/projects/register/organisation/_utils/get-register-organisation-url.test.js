const { getRegisterOrganisationURL } = require('./get-register-organisation-url');

describe('pages/projects/register/organisation/_utils/get-register-organisation-url', () => {
	describe('#getRegisterOrganisationURL', () => {
		describe('When getting the register organisation URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationURL = getRegisterOrganisationURL();
				it('should return the register organisation URL with the route parameters', () => {
					expect(registerOrganisationURL).toEqual('/projects/:case_ref/register/organisation');
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationURL = getRegisterOrganisationURL('mock-case-reference');
				it('should return the register organisation URL with the case reference', () => {
					expect(registerOrganisationURL).toEqual(
						'/projects/mock-case-reference/register/organisation'
					);
				});
			});
		});
	});
});
