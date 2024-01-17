const { getRegisterAgentNameURL } = require('./get-register-agent-name-url');

describe('pages/projects/register/agent/name/_utils/get-register-agent-name-url', () => {
	describe('#getRegisterAgentNameURL', () => {
		describe('When getting the register agent name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentNameURL = getRegisterAgentNameURL();
				it('should return the register agent name URL with the route parameters', () => {
					expect(registerAgentNameURL).toEqual('/projects/:case_ref/register/agent/full-name');
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentNameURL = getRegisterAgentNameURL('mock-case-reference');
				it('should return the register agent name URL with the case reference', () => {
					expect(registerAgentNameURL).toEqual(
						'/projects/mock-case-reference/register/agent/full-name'
					);
				});
			});
		});
	});
});
