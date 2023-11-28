const { registerIndexRoute } = require('./config');

describe('pages/projects/register/index/config', () => {
	describe('#registerIndexRoute', () => {
		it('should return the register index route', () => {
			expect(registerIndexRoute).toEqual('register-have-your-say');
		});
	});
});
