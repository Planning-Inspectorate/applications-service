const { getRegisterAgentAiDeclarationURL } = require('./get-register-agent-ai-declaration-url');

describe('pages/projects/register/agent/ai-declaration/_utils/get-register-agent-ai-declaration-url', () => {
	describe('#getRegisterAgentAiDeclarationURL', () => {
		describe('When getting the register agent AI declaration URL', () => {
			describe('and a case reference is NOT provided', () => {
				const registerAgentAiDeclarationURL = getRegisterAgentAiDeclarationURL();
				it('should return the register agent AI declaration URL with the route parameters', () => {
					expect(registerAgentAiDeclarationURL).toEqual(
						'/projects/:case_ref/register/agent/ai-declaration'
					);
				});
			});

			describe('and a case reference is provided', () => {
				const registerAgentAiDeclarationURL =
					getRegisterAgentAiDeclarationURL('mock-case-reference');
				it('should return the register agent AI declaration URL with the case reference', () => {
					expect(registerAgentAiDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/agent/ai-declaration'
					);
				});
			});
		});
	});
});
