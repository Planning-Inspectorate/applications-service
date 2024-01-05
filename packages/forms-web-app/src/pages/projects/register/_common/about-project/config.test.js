const { registerAboutProjectRoute } = require('./config');

describe('pages/projects/register/_common/about-project/config', () => {
	describe('#registerAboutProjectRoute', () => {
		it('should return the register about project route', () => {
			expect(registerAboutProjectRoute).toEqual('tell-us-about-project');
		});
	});
});
