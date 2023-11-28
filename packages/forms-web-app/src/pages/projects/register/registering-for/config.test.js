const { registeringForRoute } = require('./config');

describe('pages/projects/register/registering-for/config', () => {
	describe('#registeringForRoute', () => {
		it('should return the registering for route', () => {
			expect(registeringForRoute).toEqual('who-registering-for');
		});
	});
});
