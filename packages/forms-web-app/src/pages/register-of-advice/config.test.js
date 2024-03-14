const { registerOfAdviceRoute } = require('./config');

describe('pages/register-of-advice/config', () => {
	describe('#registerOfAdviceRoute', () => {
		it('should return the register of advice route', () => {
			expect(registerOfAdviceRoute).toEqual('register-of-advice');
		});
	});
});
