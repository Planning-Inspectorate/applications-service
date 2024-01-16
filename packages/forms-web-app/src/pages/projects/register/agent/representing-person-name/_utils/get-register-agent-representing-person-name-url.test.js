const {
	getRegisterAgentRepresentingPersonNameURL
} = require('./get-register-agent-representing-person-name-url');

describe('pages/projects/register/agent/representing-person-name/_utils/get-register-agent-representing-person-name-url', () => {
	describe('#getRegisterAgentRepresentingPersonNameURL', () => {
		describe('When getting the register agent representing person name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentRepresentingPersonNameURL = getRegisterAgentRepresentingPersonNameURL();
				it('should return the register agent representing person name URL with the route parameters', () => {
					expect(registerAgentRepresentingPersonNameURL).toEqual(
						'/projects/:case_ref/register/agent/name-person-representing'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentRepresentingPersonNameURL =
					getRegisterAgentRepresentingPersonNameURL('mock-case-reference');
				it('should return the register agent representing person name URL with the case reference', () => {
					expect(registerAgentRepresentingPersonNameURL).toEqual(
						'/projects/mock-case-reference/register/agent/name-person-representing'
					);
				});
			});
		});
	});
});
