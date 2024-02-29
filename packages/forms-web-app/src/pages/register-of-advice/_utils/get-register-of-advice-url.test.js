const { getRegisterOfAdviceURL } = require('./get-register-of-advice-url');

describe('pages/register-of-advice/_utils/get-register-of-advice-url', () => {
	describe('#getRegisterOfAdviceURL', () => {
		const registerOfAdviceURL = getRegisterOfAdviceURL();
		it('should return the register of advice URL', () => {
			expect(registerOfAdviceURL).toEqual('/register-of-advice');
		});
	});
});
