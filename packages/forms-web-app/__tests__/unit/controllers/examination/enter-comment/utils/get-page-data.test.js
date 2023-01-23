const {
	getPageData
} = require('../../../../../../src/controllers/examination/enter-comment/utils/get-page-data');

let {
	getActiveSubmissionItem
} = require('../../../../../../src/controllers/examination/session/submission-items-session');
let {
	getSubmissionItemPageUrl
} = require('../../../../../../src/controllers/examination/utils/get-submission-item-page-url');

jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));
jest.mock(
	'../../../../../../src/controllers/examination/utils/get-submission-item-page-url',
	() => ({
		getSubmissionItemPageUrl: jest.fn()
	})
);

describe('controllers/examination/enter-comment/utils/get-page-data', () => {
	describe('#getPageData', () => {
		const req = {
			session: {},
			query: {}
		};
		const mockSubmissionItemValue = 'mock submission item value';
		const mockBackLinkUrlValue = '/directory/route';
		const pageData = {
			activeSubmissionItemTitle: mockSubmissionItemValue,
			backLinkUrl: mockBackLinkUrlValue,
			comment: '',
			id: 'examination-enter-comment',
			pageTitle: 'Your comment',
			title: 'Your comment',
			url: '/examination/enter-a-comment',
			sessionId: 'comment',
			view: 'pages/examination/enter-comment'
		};
		describe('When getting the page data for the enter comment page', () => {
			describe('and there is no comment value in the session', () => {
				let result;
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({ submissionItem: mockSubmissionItemValue });
					getSubmissionItemPageUrl.mockReturnValue(mockBackLinkUrlValue);
					result = getPageData(req.query, req.session);
				});
				it('should return the page data', () => {
					expect(result).toEqual(pageData);
				});
			});
			describe('and there is a comment value in the session', () => {
				const mockCommentValue = 'mock comment value';
				let result;
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({
						comment: mockCommentValue,
						submissionItem: mockSubmissionItemValue
					});
					getSubmissionItemPageUrl.mockReturnValue(mockBackLinkUrlValue);
					result = getPageData(req.query, req.session);
				});
				it('should return the page data', () => {
					expect(result).toEqual({ ...pageData, comment: mockCommentValue });
				});
			});
			describe('and the query or session arguments are undefined', () => {
				it('should throw an error', () => {
					expect(() => getPageData()).toThrow('Query or session is undefined');
				});
			});
		});
	});
});
