const { getBackLinkUrl } = require('./get-back-link-url');
describe('#getBackLinkUrl', () => {
	describe('When going back a page for name', () => {
		describe('and the mode is edit', () => {
			const query = { mode: 'edit' };
			const result = getBackLinkUrl(query);
			it('should return the correct back link', () => {
				expect(result).toEqual('check-your-answers');
			});
		});
		describe('and the mode is NOT edit', () => {
			const query = {};
			const result = getBackLinkUrl(query);
			it('should return the correct back link', () => {
				expect(result).toEqual('who-are-you-submitting-for');
			});
		});
	});
});
