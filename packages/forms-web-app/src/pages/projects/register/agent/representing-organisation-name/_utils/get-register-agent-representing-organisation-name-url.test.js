const {
	getRegisterAgentRepresentingOrgNameURL
} = require('./get-register-agent-representing-organisation-name-url');

describe('pages/projects/register/agent/representing-organisation-name/_utils/get-register-agent-representing-organisation-name-url', () => {
	describe('#getRegisterAgentRepresentingOrgNameURL', () => {
		describe('When getting the register agent representing organisation name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentRepresentingOrgNameURL = getRegisterAgentRepresentingOrgNameURL();
				it('should return the register agent representing organisation name URL with the route parameters', () => {
					expect(registerAgentRepresentingOrgNameURL).toEqual(
						'/projects/:case_ref/register/agent/name-organisation-representing'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentRepresentingOrgNameURL =
					getRegisterAgentRepresentingOrgNameURL('mock-case-reference');
				it('should return the register agent representing organisation name URL with the case reference', () => {
					expect(registerAgentRepresentingOrgNameURL).toEqual(
						'/projects/mock-case-reference/register/agent/name-organisation-representing'
					);
				});
			});
		});
	});
});
