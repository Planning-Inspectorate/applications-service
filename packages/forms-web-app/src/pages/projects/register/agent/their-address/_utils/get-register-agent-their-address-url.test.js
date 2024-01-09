const { getRegisterAgentTheirAddressURL } = require('./get-register-agent-their-address-url');

describe('pages/projects/register/agent/their-address/_utils/get-register-agent-their-address-url', () => {
	describe('#getRegisterAgentTheirAddressURL', () => {
		describe('When getting the register agent their address URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentTheirAddressURL = getRegisterAgentTheirAddressURL();
				it('should return the register agent their address URL with the route parameters', () => {
					expect(registerAgentTheirAddressURL).toEqual(
						'/projects/:case_ref/register/agent/their-postal-address'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentTheirAddressURL = getRegisterAgentTheirAddressURL('mock-case-reference');
				it('should return the register agent their address URL with the case reference', () => {
					expect(registerAgentTheirAddressURL).toEqual(
						'/projects/mock-case-reference/register/agent/their-postal-address'
					);
				});
			});
		});
	});
});
