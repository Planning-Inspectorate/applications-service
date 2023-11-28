const { registerRoute } = require('./config');

describe('pages/projects/register/config', () => {
	describe('#registerRoute', () => {
		it('should return the register route', () => {
			expect(registerRoute).toEqual('register');
		});
	});
});
