const { getPageData } = require('./get-page-data');

let { getBackLinkUrl } = require('./get-back-link-url');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

describe('#getPageData', () => {
	describe('when setting the page data', () => {
		describe('and there is not a interested party number value value', () => {
			let result;
			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('back link url');
				result = getPageData({});
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'back link url',
					id: 'examination-your-interested-party-number',
					pageTitle: "What's your interested party number?",
					title: "What's your interested party number?"
				});
			});
		});
	});
});
