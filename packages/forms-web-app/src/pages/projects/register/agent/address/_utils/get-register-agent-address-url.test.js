const { getRegisterAgentAddressURL } = require('./get-register-agent-address-url');

describe('pages/projects/register/agent/address/_utils/get-register-agent-address-url', () => {
	describe('#getRegisterAgentAddressURL', () => {
		describe('When getting the register agent address URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentAddressURL = getRegisterAgentAddressURL();
				it('should return the register agent address URL with the route parameters', () => {
					expect(registerAgentAddressURL).toEqual('/projects/:case_ref/register/agent/address');
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentAddressURL = getRegisterAgentAddressURL('mock-case-reference');
				it('should return the register agent address URL with the case reference', () => {
					expect(registerAgentAddressURL).toEqual(
						'/projects/mock-case-reference/register/agent/address'
					);
				});
			});
		});
	});
});
