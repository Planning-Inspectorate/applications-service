const {
	getUpdatesConfirmYourEmailRoute,
	getUpdatesConfirmYourEmailI18nNamespace
} = require('./config');

describe('pages/projects/get-updates/confirm-your-email/config', () => {
	describe('#getUpdatesConfirmYourEmailRoute', () => {
		it('should return the get updates confirm your email route', () => {
			expect(getUpdatesConfirmYourEmailRoute).toEqual('confirm-your-email');
		});
	});

	describe('#getUpdatesConfirmYourEmailI18nNamespace', () => {
		it('should return the get updates confirm your email namespace', () => {
			expect(getUpdatesConfirmYourEmailI18nNamespace).toEqual('getUpdatesConfirmYourEmail');
		});
	});
});
