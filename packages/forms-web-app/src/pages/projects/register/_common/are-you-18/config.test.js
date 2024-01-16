const { registerAreYou18Route } = require('./config');

describe('pages/projects/register/_common/are-you-18/config', () => {
	describe('#registerAreYou18Route', () => {
		it('should return the register are you 18 route', () => {
			expect(registerAreYou18Route).toEqual('are-you-18-over');
		});
	});
});
