const {
	getRegisterOrganisationDeclarationURL
} = require('./get-register-organisation-declaration-url');

describe('pages/projects/register/organisation/declaration/_utils/get-register-organisation-declaration-url', () => {
	describe('#getRegisterOrganisationDeclarationURL', () => {
		describe('When getting the register organisation declaration URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationDeclarationURL = getRegisterOrganisationDeclarationURL();
				it('should return the register organisation declaration URL with the route parameters', () => {
					expect(registerOrganisationDeclarationURL).toEqual(
						'/projects/:case_ref/register/organisation/declaration'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationDeclarationURL =
					getRegisterOrganisationDeclarationURL('mock-case-reference');
				it('should return the register organisation declaration URL with the case reference', () => {
					expect(registerOrganisationDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/organisation/declaration'
					);
				});
			});
		});
	});
});
