const { registerCompleteRoute } = require('./config');

describe('pages/projects/register/_common/complete/config', () => {
	describe('#registerCompleteRoute', () => {
		it('should return the register complete route', () => {
			expect(registerCompleteRoute).toEqual('registration-complete');
		});
	});
});
