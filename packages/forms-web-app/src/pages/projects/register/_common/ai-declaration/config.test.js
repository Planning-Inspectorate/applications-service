const { registerAiDeclarationRoute } = require('./config');

describe('pages/projects/register/_common/ai-declaration/config', () => {
	describe('#registerAiDeclarationRoute', () => {
		it('should return the register AI declaration route', () => {
			expect(registerAiDeclarationRoute).toEqual('ai-declaration');
		});
	});
});
