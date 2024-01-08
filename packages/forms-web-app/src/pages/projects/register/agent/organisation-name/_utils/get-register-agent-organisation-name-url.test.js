const { getRegisterAgentOrgNameURL } = require('./get-register-agent-organisation-name-url');

describe('pages/projects/register/agent/organisation-name/_utils/get-register-agent-organisation-name-url', () => {
	describe('#getRegisterAgentOrgNameURL', () => {
		describe('When getting the register agent organisation name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentOrgNameURL = getRegisterAgentOrgNameURL();

				it('should return the register agent organisation name URL with the route parameters', () => {
					expect(registerAgentOrgNameURL).toEqual(
						'/projects/:case_ref/register/agent/name-of-organisation'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentOrgNameURL = getRegisterAgentOrgNameURL('mock-case-reference');

				it('should return the register agent organisation name URL with the case reference', () => {
					expect(registerAgentOrgNameURL).toEqual(
						'/projects/mock-case-reference/register/agent/name-of-organisation'
					);
				});
			});
		});
	});
});
