const { isRegisterOfAdviceDetailURL } = require('./is-register-of-advice-detail-url');

describe('pages/register-of-advice/detail/_utils/is-register-of-advice-detail-url', () => {
	describe('#isRegisterOfAdviceDetailURL', () => {
		describe('When determining if the user is viewing the register of advice detail page', () => {
			describe('and the user is on the register of advice detail page', () => {
				const path = '/register-of-advice/mock-id';
				const id = 'mock-id';
				it('should return true', () => {
					expect(isRegisterOfAdviceDetailURL(path, id)).toEqual(true);
				});
			});

			describe('and the user is not on the register of advice detail page', () => {
				const path = '/not-register-of-advice/mock-id';
				const id = 'mock-id';
				it('should return false', () => {
					expect(isRegisterOfAdviceDetailURL(path, id)).toEqual(false);
				});
			});
		});
	});
});
