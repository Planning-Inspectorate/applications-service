const {
	getRegisterOrganisationAiDeclarationURL
} = require('./get-register-organisation-ai-declaration-url');

describe('pages/projects/register/organisation/ai-declaration/_utils/get-register-organisation-ai-declaration-url', () => {
	describe('#getRegisterOrganisationAiDeclarationURL', () => {
		describe('When getting the register organisation AI declaration URL', () => {
			describe('and a case reference is NOT provided', () => {
				const registerOrganisationAiDeclarationURL = getRegisterOrganisationAiDeclarationURL();
				it('should return the register organisation AI declaration URL with the route parameters', () => {
					expect(registerOrganisationAiDeclarationURL).toEqual(
						'/projects/:case_ref/register/organisation/ai-declaration'
					);
				});
			});

			describe('and a case reference is provided', () => {
				const registerOrganisationAiDeclarationURL =
					getRegisterOrganisationAiDeclarationURL('mock-case-reference');
				it('should return the register organisation AI declaration URL with the case reference', () => {
					expect(registerOrganisationAiDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/organisation/ai-declaration'
					);
				});
			});
		});
	});
});
