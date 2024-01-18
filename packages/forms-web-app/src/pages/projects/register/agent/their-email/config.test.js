const { registerAgentTheirEmailRoute } = require('./config');

describe('pages/projects/register/agent/their-email/config', () => {
	describe('#registerAgentTheirEmailRoute', () => {
		it('should return the register agent their email route', () => {
			expect(registerAgentTheirEmailRoute).toEqual('their-email-address');
		});
	});
});
