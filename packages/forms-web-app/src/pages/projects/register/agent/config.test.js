const { registerAgentRoute } = require('./config');

describe('pages/projects/register/agent/config', () => {
	describe('#registerAgentRoute', () => {
		it('should return the register agent route', () => {
			expect(registerAgentRoute).toEqual('agent');
		});
	});
});
