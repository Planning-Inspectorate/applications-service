const { getPageData } = require('./get-page-data');

let { getBackLinkUrl } = require('./get-back-link-url');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

describe('#getPageData', () => {
	describe('when setting the page data', () => {
		describe('and there is not a name value', () => {
			let result;
			const mockSession = {
				currentView: {
					id: 'mock id',
					pageTitle: 'mock page title',
					title: 'mock page title'
				}
			};
			const mockQuery = { text: 'mock query' };
			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('back link url');
				result = getPageData(mockSession, mockQuery);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'back link url',
					id: 'mock id',
					pageTitle: 'mock page title',
					title: 'mock page title',
					view: 'examination/name/view.njk',
					url: 'your-name'
				});
			});
		});
	});
});
