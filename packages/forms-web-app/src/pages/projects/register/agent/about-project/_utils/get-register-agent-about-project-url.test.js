const { getRegisterAgentAboutProjectURL } = require('./get-register-agent-about-project-url');

describe('pages/projects/register/agent/about-project/_utils/get-register-agent-about-project-url', () => {
	describe('#getRegisterAgentAboutProjectURL', () => {
		describe('When getting the register agent about project URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentAboutProjectURL = getRegisterAgentAboutProjectURL();
				it('should return the register agent about project URL with the route parameters', () => {
					expect(registerAgentAboutProjectURL).toEqual(
						'/projects/:case_ref/register/agent/tell-us-about-project'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentAboutProjectURL = getRegisterAgentAboutProjectURL('mock-case-reference');
				it('should return the register agent about project URL with the case reference', () => {
					expect(registerAgentAboutProjectURL).toEqual(
						'/projects/mock-case-reference/register/agent/tell-us-about-project'
					);
				});
			});
		});
	});
});
