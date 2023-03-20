const { getPageData } = require('./get-page-data');

let { getActiveSubmissionItem } = require('../../_session/submission-items-session');
let { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));
jest.mock('../../_utils/get-submission-item-page-url', () => ({
	getSubmissionItemPageUrl: jest.fn()
}));

describe('examination/enter-comment/utils/get-page-data', () => {
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
			url: 'enter-a-comment',
			sessionId: 'comment',
			view: 'examination/enter-comment/view.njk'
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
