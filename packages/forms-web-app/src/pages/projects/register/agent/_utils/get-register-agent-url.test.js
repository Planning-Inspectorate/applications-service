const { getRegisterAgentURL } = require('./get-register-agent-url');

describe('pages/projects/register/agent/_utils/get-register-agent-url', () => {
	describe('#getRegisterAgentURL', () => {
		describe('When getting the register agent URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentURL = getRegisterAgentURL();
				it('should return the register agent URL with the route parameters', () => {
					expect(registerAgentURL).toEqual('/projects/:case_ref/register/agent');
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentURL = getRegisterAgentURL('mock-case-reference');
				it('should return the register agent URL with the case reference', () => {
					expect(registerAgentURL).toEqual('/projects/mock-case-reference/register/agent');
				});
			});
		});
	});
});
