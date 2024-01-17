const { registerAgentOrgNameRoute } = require('./config');

describe('pages/projects/register/agent/organisation-name/config', () => {
	describe('#registerAgentOrgNameRoute', () => {
		it('should return the register agent organisation name route', () => {
			expect(registerAgentOrgNameRoute).toEqual('name-of-organisation');
		});
	});
});
