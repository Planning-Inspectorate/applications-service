const {
	getRegisterAgentRepresentingHouseholdURL
} = require('./get-register-agent-representing-household-url');

describe('pages/projects/register/agent/representing-family-name/_utils/get-register-agent-representing-household-url', () => {
	describe('#getRegisterAgentRepresentingHouseholdURL', () => {
		describe('When getting the register agent representing household URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentRepresentingHouseholdURL = getRegisterAgentRepresentingHouseholdURL();
				it('should return the register agent representing household URL with the route parameters', () => {
					expect(registerAgentRepresentingHouseholdURL).toEqual(
						'/projects/:case_ref/register/agent/name-household-representing'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentRepresentingHouseholdURL =
					getRegisterAgentRepresentingHouseholdURL('mock-case-reference');
				it('should return the register agent representing household URL with the case reference', () => {
					expect(registerAgentRepresentingHouseholdURL).toEqual(
						'/projects/mock-case-reference/register/agent/name-household-representing'
					);
				});
			});
		});
	});
});
