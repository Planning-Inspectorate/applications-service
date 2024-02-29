const { registerOfAdviceIndexRoute, registerOfAdviceCaseRef } = require('./config');

describe('pages/register-of-advice/index/config', () => {
	describe('#registerOfAdviceIndexRoute', () => {
		it('should return the register of advice route', () => {
			expect(registerOfAdviceIndexRoute).toEqual('');
		});
	});
	describe('#registerOfAdviceCaseRef', () => {
		it('should return the register of advice case reference', () => {
			expect(registerOfAdviceCaseRef).toEqual('General');
		});
	});
});
