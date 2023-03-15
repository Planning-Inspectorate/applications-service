const { getBackLinkUrl } = require('./get-navigation-urls');

describe('#getBackLinkUrl', () => {
	describe('When getting the back link URL for the Section 51 Advice Detail page', () => {
		let result;
		const mockReferer = 'mock referer';
		const mockCaseRef = 'mock-case-ref';
		beforeEach(() => {
			result = getBackLinkUrl(mockReferer, mockCaseRef);
		});
		describe('and the referer does not include s51advice', () => {
			it('should return the Section 51 page URL', () => {
				expect(result).toEqual('/projects/mock-case-ref/s51advice');
			});
		});
	});
});
