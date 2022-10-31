const {
	getEnterComment,
	postEnterComment
} = require('../../../../../src/controllers/examination/enter-comment/controller');

const {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/enter-comment/utils/get-redirect-url.js');

let {
	addKeyValueToActiveSubmissionItem,
	getActiveSubmissionItem,
	getSubmissionItemSubmissionType
} = require('../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn(),
	getActiveSubmissionItem: jest.fn(),
	getSubmissionItemSubmissionType: jest.fn()
}));

jest.mock(
	'../../../../../src/controllers/examination/enter-comment/utils/get-redirect-url.js',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

describe('controllers/examination/enter-comment/controller', () => {
	const mockSession = 'mock session';
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	const req = {
		session: mockSession
	};
	const mockComment = 'Comment';
	const mockSubmissionItem = 'Submission item';
	const pageData = {
		activeSubmissionItemTitle: mockSubmissionItem,
		backLinkUrl: '/examination/select-upload-evidence-or-comment',
		comment: '',
		id: 'examination-enter-comment',
		pageTitle: 'Your comment',
		title: 'Your comment'
	};
	describe('#getEnterComment', () => {
		describe('When rendering the enter comment page', () => {
			describe('and the render is successful', () => {
				describe('and a comment is not present', () => {
					beforeEach(() => {
						getActiveSubmissionItem.mockReturnValue({
							submissionItem: mockSubmissionItem
						});
						getEnterComment(req, res);
					});
					it('should render the enter comment page without a comment', () => {
						expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', pageData);
					});
				});
				describe('and a comment is present', () => {
					beforeEach(() => {
						getActiveSubmissionItem.mockReturnValue({
							comment: mockComment,
							submissionItem: mockSubmissionItem
						});
						getEnterComment(req, res);
					});
					it('should render the enter comment page with a comment', () => {
						expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
							...pageData,
							comment: mockComment
						});
					});
				});
				describe('and there is an unhandled exception', () => {
					beforeEach(() => {
						getActiveSubmissionItem.mockImplementation(() => {
							throw new Error('something went wrong');
						});
						getEnterComment(req, res);
					});
					it('should render the error page', () => {
						expect(res.status).toHaveBeenCalledWith(500);
						expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
					});
				});
			});
		});
	});
	describe('#postEnterComment', () => {
		describe('When handling a enter comment post', () => {
			describe('and there is an error', () => {
				beforeEach(() => {
					req.body = {
						errors: { a: 'b' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					};
					getActiveSubmissionItem.mockReturnValue({
						submissionItem: mockSubmissionItem
					});
					postEnterComment(req, res);
				});
				it('should render the enter comment page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
						...pageData,
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							a: 'b'
						}
					});
				});
			});
			describe('and there are no issues', () => {
				const mockActiveSubmission = 'Active submission item';
				const mockSubmissionType = 'Submission type';
				const mockRedirectUrl = 'Redirect URL';
				beforeEach(() => {
					req.body = {
						'examination-enter-comment': mockComment
					};
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmission);
					getSubmissionItemSubmissionType.mockReturnValue(mockSubmissionType);
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postEnterComment(req, res);
				});
				it('should call the functions', () => {
					expect(getActiveSubmissionItem).toHaveBeenCalledWith(mockSession);
					expect(getSubmissionItemSubmissionType).toHaveBeenCalledWith(mockActiveSubmission);
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						mockSession,
						'comment',
						mockComment
					);
					expect(getRedirectUrl).toHaveBeenCalledWith(mockSubmissionType);
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
			describe('and there is an unhandled exception', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postEnterComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
