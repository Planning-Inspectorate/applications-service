const { registerAgentRepresentingWhoRoute } = require('./config');

describe('pages/projects/register/agent/representing-who/config', () => {
	describe('#registerAgentRepresentingWhoRoute', () => {
		it('should return the register agent representing who route', () => {
			expect(registerAgentRepresentingWhoRoute).toEqual('who-representing');
		});
	});
});
