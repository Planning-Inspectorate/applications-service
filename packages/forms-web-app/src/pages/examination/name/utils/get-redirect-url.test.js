const { getRedirectUrl } = require('./get-redirect-url');
describe('controllers/examination/name/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the back link for name', () => {
			describe('and the page is in edit mode', () => {
				const result = getRedirectUrl({ mode: 'edit' });
				it('should return the check your answers url', () => {
					expect(result).toEqual('check-your-answers');
				});
			});
			describe('and the page is NOT in edit mode', () => {
				const result = getRedirectUrl({});
				it('should return the check your answers url', () => {
					expect(result).toEqual('your-email-address');
				});
			});
		});
	});
});
