const { registerAgentRepresentingOrgNameRoute } = require('./config');

describe('pages/projects/register/agent/representing-organisation-name/config', () => {
	describe('#registerAgentRepresentingOrgNameRoute', () => {
		it('should return the register agent representing organisation name route', () => {
			expect(registerAgentRepresentingOrgNameRoute).toEqual('name-organisation-representing');
		});
	});
});
