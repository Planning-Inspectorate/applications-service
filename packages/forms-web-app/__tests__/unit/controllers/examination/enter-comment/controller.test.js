const {
	getEnterComment,
	postEnterComment
} = require('../../../../../src/controllers/examination/enter-comment/controller');

let {
	addKeyValueToActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');
let {
	getPageData
} = require('../../../../../src/controllers/examination/enter-comment/utils/get-page-data');
let {
	getRedirectRoute
} = require('../../../../../src/controllers/examination/enter-comment/utils/get-redirect-route');
let {
	getSubmissionItemPageUrl
} = require('../../../../../src/controllers/examination/utils/get-submission-item-page-url');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/enter-comment/utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock(
	'../../../../../src/controllers/examination/enter-comment/utils/get-redirect-route',
	() => ({
		getRedirectRoute: jest.fn()
	})
);
jest.mock('../../../../../src/controllers/examination/utils/get-submission-item-page-url', () => ({
	getSubmissionItemPageUrl: jest.fn()
}));

describe('controllers/examination/enter-comment/controller', () => {
	const req = {
		body: {},
		session: {},
		query: {}
	};
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	describe('#getEnterComment', () => {
		describe('When rendering the enter comment page', () => {
			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue({});
					getEnterComment(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.session, req.query);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {});
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
				beforeEach(() => {
					const mockReq = {
						...req,
						body: error
					};
					getPageData.mockReturnValue({});
					postEnterComment(mockReq, res);
				});
				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', error);
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
			});
		});
	});
});
