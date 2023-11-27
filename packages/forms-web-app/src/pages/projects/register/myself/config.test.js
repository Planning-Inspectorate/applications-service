const { registerMyselfRoute } = require('./config');

describe('pages/projects/register/myself/config', () => {
	describe('#registerMyselfRoute', () => {
		it('should return the register myself route', () => {
			expect(registerMyselfRoute).toEqual('myself');
		});
	});
});
