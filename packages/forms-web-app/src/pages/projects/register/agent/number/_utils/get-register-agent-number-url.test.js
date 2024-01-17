const { getRegisterAgentNumberURL } = require('./get-register-agent-number-url');

describe('pages/projects/register/agent/number/_utils/get-register-agent-number-url', () => {
	describe('#getRegisterAgentNumberURL', () => {
		describe('When getting the register agent number URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentNumberURL = getRegisterAgentNumberURL();
				it('should return the register agent number URL with the route parameters', () => {
					expect(registerAgentNumberURL).toEqual(
						'/projects/:case_ref/register/agent/telephone-number'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentNumberURL = getRegisterAgentNumberURL('mock-case-reference');
				it('should return the register agent number URL with the case reference', () => {
					expect(registerAgentNumberURL).toEqual(
						'/projects/mock-case-reference/register/agent/telephone-number'
					);
				});
			});
		});
	});
});
