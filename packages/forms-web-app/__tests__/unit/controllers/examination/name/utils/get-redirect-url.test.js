const {
	getRedirectUrl
} = require('../../../../../../src/controllers/examination/name/utils/get-redirect-url');
describe('controllers/examination/name/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the back link for party number', () => {
			describe('and the page is in edit mode', () => {
				const result = getRedirectUrl({ mode: 'edit' });
				it('should return the check your answers url', () => {
					expect(result).toEqual('/examination/check-your-answers');
				});
			});
			describe('and the page is NOT in edit mode', () => {
				const result = getRedirectUrl({});
				it('should return the check your answers url', () => {
					expect(result).toEqual('/examination/your-email-address');
				});
			});
		});
	});
});
