const { getRegisterAgentDeclarationURL } = require('./get-register-agent-declaration-url');

describe('pages/projects/register/agent/declaration/_utils/get-register-agent-declaration-url', () => {
	describe('#getRegisterAgentDeclarationURL', () => {
		describe('When getting the register agent declaration URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentDeclarationURL = getRegisterAgentDeclarationURL();
				it('should return the register agent declaration URL with the route parameters', () => {
					expect(registerAgentDeclarationURL).toEqual(
						'/projects/:case_ref/register/agent/declaration'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentDeclarationURL = getRegisterAgentDeclarationURL('mock-case-reference');
				it('should return the register agent declaration URL with the case reference', () => {
					expect(registerAgentDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/agent/declaration'
					);
				});
			});
		});
	});
});
