const {
	getRegisterAgentRepresentingFamilyNameURL
} = require('./get-register-agent-representing-family-name-url');

describe('pages/projects/register/agent/representing-family-name/_utils/get-register-agent-representing-family-name-url', () => {
	describe('#getRegisterAgentRepresentingFamilyNameURL', () => {
		describe('When getting the register agent representing family name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentRepresentingFamilyNameURL = getRegisterAgentRepresentingFamilyNameURL();
				it('should return the register agent representing family name URL with the route parameters', () => {
					expect(registerAgentRepresentingFamilyNameURL).toEqual(
						'/projects/:case_ref/register/agent/name-family-group-representing'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentRepresentingFamilyNameURL =
					getRegisterAgentRepresentingFamilyNameURL('mock-case-reference');
				it('should return the register agent representing family name URL with the case reference', () => {
					expect(registerAgentRepresentingFamilyNameURL).toEqual(
						'/projects/mock-case-reference/register/agent/name-family-group-representing'
					);
				});
			});
		});
	});
});
