const { registerAlreadySubmittedRoute } = require('./config');

describe('pages/projects/register/_common/already-registered/config', () => {
	describe('#registerAlreadyRegisteredRoute', () => {
		it('should return the register already registered route', () => {
			expect(registerAlreadySubmittedRoute).toEqual('already-registered');
		});
	});
});
