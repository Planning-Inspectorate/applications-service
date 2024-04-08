const { registerAgentOrgNameRoute, registerAgentOrgNameInputID } = require('./config');

describe('pages/projects/register/agent/organisation-name/config', () => {
	describe('#registerAgentOrgNameRoute', () => {
		it('should return the register agent organisation name route', () => {
			expect(registerAgentOrgNameRoute).toEqual('name-of-organisation');
		});
	});

	describe('#registerAgentOrgNameInputID', () => {
		it('should return the register agent organisation name input id', () => {
			expect(registerAgentOrgNameInputID).toEqual('organisation-name');
		});
	});
});
