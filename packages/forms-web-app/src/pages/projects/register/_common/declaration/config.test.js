const { registerDeclarationRoute } = require('./config');

describe('pages/projects/register/_common/declaration/config', () => {
	describe('#registerDeclarationRoute', () => {
		it('should return the register declaration route', () => {
			expect(registerDeclarationRoute).toEqual('declaration');
		});
	});
});
