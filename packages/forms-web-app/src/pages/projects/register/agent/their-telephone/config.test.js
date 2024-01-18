const { registerAgentTheirTelephoneRoute } = require('./config');

describe('pages/projects/register/agent/their-telephone/config', () => {
	describe('#registerAgentTheirTelephoneRoute', () => {
		it('should return the register agent their telephone route', () => {
			expect(registerAgentTheirTelephoneRoute).toEqual('their-telephone-number');
		});
	});
});
