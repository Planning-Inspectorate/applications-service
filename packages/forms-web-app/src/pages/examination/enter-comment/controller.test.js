const { getEnterComment, postEnterComment } = require('./controller');

let { addKeyValueToActiveSubmissionItem } = require('../_session/submission-items-session');
let { getPageData } = require('./utils/get-page-data');
let { getRedirectRoute } = require('./utils/get-redirect-route');
let { getSubmissionItemPageUrl } = require('../_utils/get-submission-item-page-url');

jest.mock('../_session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('./utils/get-redirect-route', () => ({
	getRedirectRoute: jest.fn()
}));
jest.mock('../_utils/get-submission-item-page-url', () => ({
	getSubmissionItemPageUrl: jest.fn()
}));

describe('examination/enter-comment/controller', () => {
	const req = {
		body: {},
		session: {},
		query: {}
	};
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res),
		send: jest.fn()
	};
	const pageData = {
		id: 'examination-enter-comment',
		text: 'mock page data',
		view: 'mock view',
		sessionId: 'comment',
		url: '/mock-url'
	};

	describe('#getEnterComment', () => {
		describe('When rendering the enter comment page', () => {
			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(pageData);
					getEnterComment(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.session, req.query);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith(pageData.view, pageData);
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
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

	describe('#postEnterComment', () => {
		describe('When handling the enter comment post request', () => {
			describe('and there is an error', () => {
				const error = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};

				it('should render the page with errors', () => {
					const mockReq = {
						...req,
						body: error
					};
					getPageData.mockReturnValue(pageData);
					postEnterComment(mockReq, res);

					expect(res.render).toHaveBeenCalledWith(pageData.view, {
						...pageData,
						...error
					});
				});
			});

			describe('and there is not an "examination-enter-comment" value in the body', () => {
				beforeEach(() => {
					postEnterComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there is a "examination-enter-comment" value in the body', () => {
				const mockReq = {
					...req,
					body: {
						'examination-enter-comment': 'mock comment value'
					}
				};
				beforeEach(() => {
					addKeyValueToActiveSubmissionItem.mockReturnValue(true);
					getRedirectRoute.mockReturnValue('/route');
					getSubmissionItemPageUrl.mockReturnValue('/directory/route');
					postEnterComment(mockReq, res);
				});
				it('should call the functions', () => {
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						req.session,
						'comment',
						'mock comment value'
					);
					expect(getRedirectRoute).toHaveBeenCalledWith(req.session);
					expect(getSubmissionItemPageUrl).toHaveBeenCalledWith(req.query, '/route');
				});
				it('should redirect to', () => {
					expect(res.redirect).toHaveBeenCalledWith('/directory/route');
				});

				describe('and there is a request with a "examination-enter-comment" value in the body', () => {
					const mockReq = {
						...req,
						body: {
							'examination-enter-comment': 'mock comment value'
						}
					};
					beforeEach(() => {
						addKeyValueToActiveSubmissionItem.mockReturnValue(true);
						getRedirectRoute.mockReturnValue('/route');
						getSubmissionItemPageUrl.mockReturnValue('/directory/route');
						getPageData.mockReturnValue(pageData);
						postEnterComment(mockReq, res);
					});
					it('should call the functions', () => {
						expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
							req.session,
							'comment',
							'mock comment value'
						);
						expect(getRedirectRoute).toHaveBeenCalledWith(req.session);
						expect(getSubmissionItemPageUrl).toHaveBeenCalledWith(req.query, '/route');
					});
					it('should send response to redirect to the next page to be sent', () => {
						expect(res.redirect).toHaveBeenCalledWith('/directory/route');
					});
				});
			});
		});
	});
});
