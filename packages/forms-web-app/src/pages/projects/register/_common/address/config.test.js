const { registerAddressRoute } = require('./config');

describe('pages/projects/register/_common/address/config', () => {
	describe('#registerAddressRoute', () => {
		it('should return the register address route', () => {
			expect(registerAddressRoute).toEqual('address');
		});
	});
});
