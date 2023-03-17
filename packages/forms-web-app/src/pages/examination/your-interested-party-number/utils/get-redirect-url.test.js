const { getRedirectUrl } = require('./get-redirect-url');
describe('examination/your-interested-party-number/utils/get-redirect-url', () => {
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
					expect(result).toEqual('/examination/who-are-you-submitting-for');
				});
			});
		});
	});
});
