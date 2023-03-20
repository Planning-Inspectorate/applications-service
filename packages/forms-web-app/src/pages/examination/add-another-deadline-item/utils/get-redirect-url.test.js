const { getRedirectUrl } = require('./get-redirect-url');

describe('examination/add-another-deadline-item/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the redirect URL', () => {
			describe('and the option was yes', () => {
				const option = 'yes';
				const result = getRedirectUrl(option);
				it('should return the correct url', () => {
					expect(result).toEqual('select-deadline-item');
				});
			});
			describe('and the option was no', () => {
				const option = 'no';
				const result = getRedirectUrl(option);
				it('should return the correct url', () => {
					expect(result).toEqual('check-your-answers');
				});
			});
			describe('and there is no option', () => {
				it('should throw an error', () => {
					expect(() => getRedirectUrl()).toThrow('No redirect URL for add another deadline item');
				});
			});
		});
	});
});
