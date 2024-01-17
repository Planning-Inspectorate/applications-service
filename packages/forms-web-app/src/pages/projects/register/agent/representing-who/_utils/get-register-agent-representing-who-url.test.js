const { getRegisterAgentRepresentingWhoURL } = require('./get-register-agent-representing-who-url');

describe('pages/projects/register/agent/representing-who/_utils/get-register-agent-representing-who-url', () => {
	describe('#getRegisterAgentRepresentingWhoURL', () => {
		describe('When getting the register agent representing who URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentRepresentingWhoURL = getRegisterAgentRepresentingWhoURL();
				it('should return the register agent representing who URL with the route parameters', () => {
					expect(registerAgentRepresentingWhoURL).toEqual(
						'/projects/:case_ref/register/agent/who-representing'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentRepresentingWhoURL =
					getRegisterAgentRepresentingWhoURL('mock-case-reference');
				it('should return the register agent representing who URL with the case reference', () => {
					expect(registerAgentRepresentingWhoURL).toEqual(
						'/projects/mock-case-reference/register/agent/who-representing'
					);
				});
			});
		});
	});
});
