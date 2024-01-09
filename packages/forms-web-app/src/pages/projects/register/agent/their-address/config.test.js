const { registerAgentTheirAddressRoute } = require('./config');

describe('pages/projects/register/agent/their-address/config', () => {
	describe('#registerAgentTheirAddressRoute', () => {
		it('should return the register agent their postal address route', () => {
			expect(registerAgentTheirAddressRoute).toEqual('their-postal-address');
		});
	});
});
