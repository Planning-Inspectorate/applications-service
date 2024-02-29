const { getRegisterOfAdviceIndexURL } = require('./get-register-of-advice-index-url');

describe('pages/register-of-advice/index/_utils/get-register-of-advice-index-url', () => {
	describe('#getRegisterOfAdviceIndexURL', () => {
		const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL();
		it('should return the register of advice URL', () => {
			expect(registerOfAdviceIndexURL).toEqual('/register-of-advice');
		});
	});
});
