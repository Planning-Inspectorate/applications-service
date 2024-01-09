const { registerAgentRepresentingFamilyNameRoute } = require('./config');

describe('pages/projects/register/agent/representing-family-name/config', () => {
	describe('#registerAgentRepresentingFamilyNameRoute', () => {
		it('should return the register agent representing family name route', () => {
			expect(registerAgentRepresentingFamilyNameRoute).toEqual('name-family-group-representing');
		});
	});
});
