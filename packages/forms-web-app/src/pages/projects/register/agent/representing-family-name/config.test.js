const { registerAgentRepresentingHouseholdRoute } = require('./config');

describe('pages/projects/register/agent/representing-family-name/config', () => {
	describe('#registerAgentRepresentingHouseholdRoute', () => {
		it('should return the register agent representing household route', () => {
			expect(registerAgentRepresentingHouseholdRoute).toEqual('name-household-representing');
		});
	});
});
