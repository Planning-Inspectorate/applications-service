const { registerNameRoute } = require('./config');

describe('pages/projects/register/_common/name/config', () => {
	describe('#registerNameRoute', () => {
		it('should return the register name route', () => {
			expect(registerNameRoute).toEqual('full-name');
		});
	});
});
