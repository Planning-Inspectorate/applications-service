const { getRegisterAgentCompleteURL } = require('./get-register-agent-complete-url');

describe('pages/projects/register/agent/complete/_utils/get-register-agent-complete-url', () => {
	describe('#getRegisterAgentCompleteURL', () => {
		describe('When getting the register agent complete URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentCompleteURL = getRegisterAgentCompleteURL();
				it('should return the register agent complete URL with the route parameters', () => {
					expect(registerAgentCompleteURL).toEqual(
						'/projects/:case_ref/register/agent/registration-complete'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentCompleteURL = getRegisterAgentCompleteURL('mock-case-reference');
				it('should return the register agent complete URL with the case reference', () => {
					expect(registerAgentCompleteURL).toEqual(
						'/projects/mock-case-reference/register/agent/registration-complete'
					);
				});
			});
		});
	});
});
