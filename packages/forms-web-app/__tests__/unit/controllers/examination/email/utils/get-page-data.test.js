const {
	getPageData
} = require('../../../../../../src/controllers/examination/email/utils/get-page-data');
const {
	getBackLink
} = require('../../../../../../src/controllers/examination/email/utils/get-back-link');

jest.mock('../../../../../../src/controllers/examination/email/utils/get-back-link', () => ({
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
				hint: "We'll use your email address to confirm we've received your submission. We will not publish your email address.",
				id: 'examination-email',
				pageTitle: "What's your email address?",
				title: "What's your email address?"
			});
		});
	});
});
