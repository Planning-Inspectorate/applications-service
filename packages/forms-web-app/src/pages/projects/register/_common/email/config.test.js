const { registerEmailRoute } = require('./config');

describe('pages/projects/register/_common/email/config', () => {
	describe('#registerEmailRoute', () => {
		it('should return the register email route', () => {
			expect(registerEmailRoute).toEqual('email-address');
		});
	});
});
