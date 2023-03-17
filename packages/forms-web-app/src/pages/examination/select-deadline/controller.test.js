const { getSelectDeadline, postSelectDeadline } = require('./controller');

const { setActiveSubmissionItem } = require('../_session/submission-items-session');
const { findDeadlineItemByValue } = require('../_session/deadlineItems-session');
const { getPageData } = require('./utils/get-page-data');
const { handleEditModeSubmissionItemId } = require('./utils/handle-edit-mode-submission-item-id');
const { getRedirectUrl } = require('./utils/get-redirect-url');

jest.mock('../_session/submission-items-session', () => ({
	setActiveSubmissionItem: jest.fn()
}));
jest.mock('../_session/deadlineItems-session', () => ({
	findDeadlineItemByValue: jest.fn()
}));
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('./utils/handle-edit-mode-submission-item-id', () => ({
	handleEditModeSubmissionItemId: jest.fn()
}));
jest.mock('./utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));

const mockPageDataValue = { page: 'data' };

describe('examination/select-deadline/controller', () => {
	describe('#getSelectDeadline', () => {
		describe('When rendering the select a deadline page', () => {
			const req = {
				query: {
					mockQuery: 'mock query'
				},
				session: {
					mockSession: 'mock session'
				}
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};

			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					getSelectDeadline(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.query, req.session);
				});
				it('should render the selected deadline as checked', () => {
					expect(res.render).toHaveBeenCalledWith(
						'examination/select-deadline/view.njk',
						mockPageDataValue
					);
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getSelectDeadline(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postSelectDeadline', () => {
		describe('When handling a selected deadline post', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				body: {
					mockBody: 'mock body'
				},
				query: {
					mockQuery: 'mock query'
				},
				session: {
					mockSession: 'mock session'
				}
			};

			describe('and there is an error', () => {
				const error = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				const mockReq = {
					...req,
					body: error
				};

				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					postSelectDeadline(mockReq, res);
				});

				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.query, req.session);
				});

				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('examination/select-deadline/view.njk', {
						...mockPageDataValue,
						...error
					});
				});
			});

			describe('and there is no selected deadline in the body', () => {
				beforeEach(() => {
					postSelectDeadline(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there are no issues', () => {
				const mockFoundDeadlineItem = { value: 'mock value', text: 'mock text' };
				const mockBodyDeadlineItem = 'mock selected deadline item';
				const mockReq = {
					...req,
					body: {
						'examination-select-deadline': mockBodyDeadlineItem
					}
				};
				const mockRedirectUrl = 'mock redirect url';

				beforeEach(() => {
					findDeadlineItemByValue.mockReturnValue(mockFoundDeadlineItem);
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postSelectDeadline(mockReq, res);
				});

				it('should call the functions', () => {
					expect(findDeadlineItemByValue).toHaveBeenCalledWith(
						mockReq.session,
						mockBodyDeadlineItem
					);
					expect(setActiveSubmissionItem).toHaveBeenCalledWith(
						mockReq.session,
						mockFoundDeadlineItem
					);
					expect(handleEditModeSubmissionItemId).toHaveBeenCalledWith(
						mockReq.query,
						mockReq.session,
						mockFoundDeadlineItem.value
					);
					expect(getRedirectUrl).toHaveBeenCalledWith(mockReq.query);
				});

				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
		});
	});
});
