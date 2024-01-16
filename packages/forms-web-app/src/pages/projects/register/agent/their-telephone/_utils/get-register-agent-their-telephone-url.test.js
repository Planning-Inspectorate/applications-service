const { getRegisterAgentTheirTelephoneURL } = require('./get-register-agent-their-telephone-url');

describe('pages/projects/register/agent/their-telephone/_utils/get-register-agent-their-telephone-url', () => {
	describe('#getRegisterAgentTheirTelephoneURL', () => {
		describe('When getting the register agent their telephone URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentTheirTelephoneURL = getRegisterAgentTheirTelephoneURL();
				it('should return the register agent their telephone URL with the route parameters', () => {
					expect(registerAgentTheirTelephoneURL).toEqual(
						'/projects/:case_ref/register/agent/their-telephone-number'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentTheirTelephoneURL =
					getRegisterAgentTheirTelephoneURL('mock-case-reference');
				it('should return the register agent their telephone URL with the case reference', () => {
					expect(registerAgentTheirTelephoneURL).toEqual(
						'/projects/mock-case-reference/register/agent/their-telephone-number'
					);
				});
			});
		});
	});
});
