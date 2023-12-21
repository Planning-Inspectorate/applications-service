const { getRegisterAgentEmailURL } = require('./get-register-agent-email-url');

describe('pages/projects/register/agent/email/_utils/get-register-agent-email-url', () => {
	describe('#getRegisterAgentEmailURL', () => {
		describe('When getting the register agent email URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentEmailURL = getRegisterAgentEmailURL();
				it('should return the register agent email URL with the route parameters', () => {
					expect(registerAgentEmailURL).toEqual('/projects/:case_ref/register/agent/email-address');
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentEmailURL = getRegisterAgentEmailURL('mock-case-reference');
				it('should return the register agent email URL with the case reference', () => {
					expect(registerAgentEmailURL).toEqual(
						'/projects/mock-case-reference/register/agent/email-address'
					);
				});
			});
		});
	});
});
