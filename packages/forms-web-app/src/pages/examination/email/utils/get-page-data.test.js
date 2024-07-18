const { getPageData } = require('./get-page-data');
const { getBackLink } = require('./get-back-link');

jest.mock('./get-back-link', () => ({
	getBackLink: jest.fn()
}));
describe('#getPageData', () => {
	describe('When getting the page data for the email page', () => {
		let response;
		const mockSession = { text: 'mock session' };
		const mockQuery = { text: 'mock query' };
		beforeEach(() => {
			getBackLink.mockReturnValue('mock back link');
			response = getPageData(mockSession, mockQuery);
		});
		it('should return the expected page data', () => {
			expect(response).toEqual({
				backLinkUrl: 'mock back link',
				id: 'examination-email'
			});
		});
	});
});
