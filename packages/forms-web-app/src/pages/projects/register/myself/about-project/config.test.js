const { registerMyselfAboutProjectRoute } = require('./config');

describe('pages/projects/register/myself/about-project/config', () => {
	describe('#registerMyselfAboutProjectRoute', () => {
		it('should return the register myself about project route', () => {
			expect(registerMyselfAboutProjectRoute).toEqual('tell-us-about-project');
		});
	});
});
