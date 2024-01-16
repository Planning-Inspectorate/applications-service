const { getRegisterAgentTheirEmailURL } = require('./get-register-agent-their-email-url');

describe('pages/projects/register/agent/their-email/_utils/get-register-agent-their-email-url', () => {
	describe('#getRegisterAgentTheirEmailURL', () => {
		describe('When getting the register agent their email URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentTheirEmailURL = getRegisterAgentTheirEmailURL();
				it('should return the register agent their email URL with the route parameters', () => {
					expect(registerAgentTheirEmailURL).toEqual(
						'/projects/:case_ref/register/agent/their-email-address'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentTheirEmailURL = getRegisterAgentTheirEmailURL('mock-case-reference');
				it('should return the register agent their email URL with the case reference', () => {
					expect(registerAgentTheirEmailURL).toEqual(
						'/projects/mock-case-reference/register/agent/their-email-address'
					);
				});
			});
		});
	});
});
