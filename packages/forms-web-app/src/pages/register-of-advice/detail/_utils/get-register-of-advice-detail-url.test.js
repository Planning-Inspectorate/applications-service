const { getRegisterOfAdviceDetailURL } = require('./get-register-of-advice-detail-url');

describe('pages/register-of-advice/detail/_utils/get-register-of-advice-detail-url', () => {
	describe('#getRegisterOfAdviceDetailURL', () => {
		describe('When getting the register of advice detail URL', () => {
			describe('and a details id is not provided', () => {
				const registerOfAdviceDetailURL = getRegisterOfAdviceDetailURL();
				it('should return the register of advice detail URL with the route parameters', () => {
					expect(registerOfAdviceDetailURL).toEqual('/register-of-advice/:id');
				});
			});
			describe('and a details id is provided', () => {
				const registerOfAdviceDetailURL = getRegisterOfAdviceDetailURL('mock-details-id');
				it('should return the register of advice detail URL with the details id', () => {
					expect(registerOfAdviceDetailURL).toEqual('/register-of-advice/mock-details-id');
				});
			});
		});
	});
});
