const { registerNumberRoute } = require('./config');

describe('pages/projects/register/_common/number/config', () => {
	describe('#registerNumberRoute', () => {
		it('should return the register number route', () => {
			expect(registerNumberRoute).toEqual('telephone-number');
		});
	});
});
